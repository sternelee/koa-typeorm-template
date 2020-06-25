import * as Mercury from "@postlight/mercury-parser";
import { getManager } from "typeorm";
import Post from "../entity/Post";
import * as Got from "got";
import TranslateService from "../service/translate-service";
import { UserAgent } from "../contant";

const Uri = "https://app.dailynow.co/";

export default class PostController {
  // 爬取文章的主体内容
  static async fetch(ctx) {
    const { pid, type = "markdown", link = null } = ctx.request.query;
    const repo = getManager().getRepository(Post);
    const hasPost = await repo.find({ where: { pid }, take: 1 });
    if (hasPost.length && hasPost[0].content) {
      return (ctx.body = {
        code: 0,
        result: "ok",
        data: hasPost[0],
      });
    }
    let realUrl = ''
    if (link) {
      realUrl = link
    } else {
      const resBody = await Got(`${Uri}r/${pid}`, {
        followRedirect: false,
      });
      const body = resBody.body;
      realUrl = body.split("URL=")[1].split('"')[0];
    }
    let data = await Mercury.parse(realUrl, {
      contentType: type,
      headers: {
        "user-agent": UserAgent,
      },
    });
    if (data) {
      const post = new Post();
      post.author = data.author || "";
      post.date = data.date_published || "";
      post.lead_image_url = data.lead_image_url || "";
      post.word_count = data.word_count;
      post.url = data.url;
      post.content = data.content;
      post.content_cn = await TranslateService.markdown(data.content);
      if (hasPost.length) {
        // 更新，一般已经有了pid,标题和中文标题
        await repo.update({ pid }, post);
      } else {
        // 新增
        post.pid = pid;
        post.title = data.title;
        post.title_cn = await TranslateService.string(data.title);
        await repo.save(post);
      }
      data = hasPost.length ? {...post, pid: pid, title: hasPost[0].title, title_cn: hasPost[0].title_cn} : post
      return (ctx.body = {
        code: 0,
        result: "ok",
        data,
      });
    }
    return (ctx.body = {
      code: -1,
      result: "fail",
      data: null,
    });
  }

  // 批量创建文章的标题，中文标题等
  static async post (ctx) {
    const { list } = ctx.request.body;
    const repo = getManager().getRepository(Post);
    const datas = []
    for (let i = 0; i < list.length; i++) {
      const pid = list[i].id
      const title = list[i].title
      const hasPost = await repo.find({ where: { pid }, take: 1 });
      if (hasPost.length) {
        datas.push({
          id: pid,
          title: hasPost[0].title_cn
        })
        continue
      }
      const post = new Post();
      post.pid = pid;
      post.title = title;
      post.title_cn = await TranslateService.string(title);
      datas.push({
        id: pid,
        title: post.title_cn
      })
      await repo.save(post);
    }
    return (ctx.body = {
      code: 0,
      result: "ok",
      data: datas,
    });
  }
}

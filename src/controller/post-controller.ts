import * as Mercury from "@postlight/mercury-parser";
import { getManager } from "typeorm";
import Post from "../entity/Post";
import * as Got from "got";
import TranslateService from "../service/translate-service";
import { UserAgent } from "../contant";

const Uri = "https://app.dailynow.co/";

export default class PostController {
  static async fetch(ctx) {
    const { pid, type = "markdown" } = ctx.request.query;
    const repo = getManager().getRepository(Post);
    const hasPost = await repo.find({ where: { pid }, take: 1 });
    if (hasPost.length) {
      return (ctx.body = {
        code: 0,
        result: "ok",
        data: hasPost[0],
      });
    }
    const url = `${Uri}r/${pid}`;
    const resBody = await Got(url, {
      followRedirect: false,
    });
    const body = resBody.body;
    const dirUrl = body.split("URL=")[1].split('"')[0];
    const data = await Mercury.parse(dirUrl, {
      contentType: type,
      headers: {
        "user-agent": UserAgent,
      },
    });
    if (data) {
      const post = new Post();
      post.pid = pid;
      post.author = data.author || "";
      post.date = data.date_published || "";
      post.title = data.title;
      post.title_cn = await TranslateService.string(data.title);
      post.content = data.content;
      // 中文翻译
      post.content_cn = await TranslateService.markdown(data.content);
      post.lead_image_url = data.lead_image_url || "";
      post.word_count = data.word_count;
      post.url = data.url;
      await repo.save(post);
      return (ctx.body = {
        code: 0,
        result: "ok",
        data: post,
      });
    }
    return (ctx.body = {
      code: -1,
      result: "fail",
      data: null,
    });
  }
}

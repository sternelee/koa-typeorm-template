// import * as Mercury from "@postlight/mercury-parser";
import { getManager } from "typeorm";
import Post from "../entity/Post";
import * as Got from "got";
import TranslateService from "../service/translate-service";
// import { UserAgent } from "../contant";

// const Uri = "https://app.dailynow.co/";

export default class PostController {
  // 爬取文章的主体内容
  static async fetch(ctx) {
    const { pid, type = "markdown", link = '', cid = '1' } = ctx.request.query;
    const repo = getManager().getRepository(Post);
    const hasPost = await repo.findOne({ pid });
    if (hasPost && hasPost.content) {
      return (ctx.body = {
        code: 0,
        result: "ok",
        data: hasPost,
      });
    }
    // let realUrl = "";
    // if (link) {
    //   realUrl = link;
    // } else {
    //   const resBody = await Got(`${Uri}r/${pid}`, {
    //     followRedirect: false,
    //   });
    //   const body = resBody.body;
    //   realUrl = body.split("URL=")[1].split('"')[0];
    // }
    // let data = await Mercury.parse(realUrl, {
    //   contentType: type,
    //   headers: {
    //     "user-agent": UserAgent,
    //   },
    // });
    // 换成在谷歌云内爬取
    const resBody = await Got(
      `http://sterne.me:3006/post/daily?pid=${pid}&link=${link}&type=${type}`
    );
    let data = JSON.parse(resBody.body)
    if (data) {
      const post = new Post();
      post.author = data.author || "";
      post.date = data.date_published || null;
      post.lead_image_url = data.lead_image_url || "";
      post.word_count = data.word_count;
      post.url = data.url;
      post.content = data.content;
      post.content_cn = await TranslateService.markdown(data.content);
      post.pid = pid;
      post.cid = cid;
      post.title = data.title;
      post.title_cn = await TranslateService.string(data.title);
      const newData = await repo.save(post);
      post.id = newData.id;
      data = post;
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
  static async post(ctx) {
    const { list } = ctx.request.body;
    const repo = getManager().getRepository(Post);
    let datas = [];
    // TODO: 需要过滤已保存的，并按照原来的列表顺序返回
    const bigDatas: any = {};
    const pids = list.map(v => v.id);
    const hasPosts = await repo.find({ where: pids.map(v => ({pid: v})), cache: true });
    const hasPids = hasPosts.map(v => {
      bigDatas[v.pid] = v;
      return v.pid
    });
    const lastList = list.filter(v => hasPids.indexOf(v.id) < 0);
    const lastTitles = lastList.map(v => v.title).join('$$$$');
    let lastTitleCns = await TranslateService.string(lastTitles);
    lastTitleCns = lastTitleCns.split('$$$$');
    for (let i = 0; i < lastList.length; i++) {
      const pid = lastList[i].id;
      const post = new Post();
      post.pid = pid;
      post.title = lastList[i].title;
      post.title_cn = lastTitleCns[i];
      const newPost = await repo.save(post);
      bigDatas[pid] = newPost;
    }
    datas = list.map(v => bigDatas[v.id]);
    // 先新版本无法上架，先改回旧版
    // datas = list.map(v => {
    //   const data = bigDatas[v.id]
    //   return {
    //     id: data.pid,
    //     title: data.title_cn
    //   }
    // });
    // for (let i = 0; i < list.length; i++) {
    //   const pid = list[i].id;
    //   const title = list[i].title;
    //   const hasPost = await repo.find({ where: { pid }, take: 1 });
    //   if (hasPost.length) {
    //     datas.push({
    //       id: pid,
    //       title: hasPost[0].title_cn,
    //     });
    //     continue;
    //   }
    //   const post = new Post();
    //   post.pid = pid;
    //   post.title = title;
    //   post.title_cn = await TranslateService.string(title);
    //   datas.push({
    //     id: pid,
    //     title: post.title_cn,
    //   });
    //   await repo.save(post);
    // }
    return (ctx.body = {
      code: 0,
      result: "ok",
      data: datas,
    });
  }

  static async find(ctx) {
    const { ids = '' } = ctx.request.query;
    const repo = getManager().getRepository(Post);
    const where = ids ? ids.split(',').map((v) => ({ id: v })) : [];
    const data = await repo.find({ where });
    return (ctx.body = {
      code: 0,
      result: "ok",
      data,
    });
  }
}

// 干净简洁版，只保存md文档

import * as Got from "got";
import * as TurndownService from "turndown";
import TranslateService from "../service/translate-service";
import Weekly from "../entity/Weely";
import { getManager } from "typeorm";

const turndownService = new TurndownService();

const WeekMap = {
  1: {
    uri: "https://javascriptweekly.com",
    title: "JavaScript Weekly",
  },
  2: {
    uri: "https://frontendfoc.us",
    title: "Frontend Focus",
  },
  3: {
    uri: "https://nodeweekly.com",
    title: "Node Weekly",
  },
  4: {
    uri: "https://react.statuscode.com",
    title: "React Status", // 要重新匹配
  },
  5: {
    uri: "https://mobiledevweekly.com",
    title: "Mobile Developer Weekly",
  },
  6: {
    uri: "https://golangweekly.com",
    title: "Golang Weekly",
  },
  7: {
    uri: "https://rubyweekly.com",
    title: "Ruby Weekly",
  },
  8: {
    uri: "https://dbweekly.com",
    title: "Database Status",
  },
  9: {
    uri: "https://weekly.statuscode.com",
    title: "StatusCode Weekly", // 要重新匹配
  },
  10: {
    uri: "https://serverless.email",
    title: "Serverless Status", // 要重新匹配
  },
  11: {
    uri: "https://mongodb.email",
    title: "MongoDB Memo",
  },
  12: {
    uri: "https://postgresweekly.com",
    title: "Postgres Weekly",
  },
  13: {
    uri: "https://pycoders.com", // 跳转链接需要特殊处理
    title: "Python Weekly",
  },
  14: {
    uri: "https://news.vuejs.org",
    title: "Vuejs News",
  },
  15: {
    uri: "https://css-weekly.com",
    title: "CSS Weekly",
  },
  16: {
    uri: "https://ma.ttias.be/cronweekly",
    title: "cron.weekly",
  },
};
const cgot = Got.extend({
  headers: {
    "user-agent":
      "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1",
  },
});

export default class WeeklyController {
  static async fetch(ctx) {
    let { id = "latest", cid = 1, title = "" } = ctx.request.query;
    const mapData = WeekMap[cid];
    if (!mapData) {
      return (ctx.body = {
        code: 0,
        data: null,
      });
    }
    let content = "";
    let url = mapData.uri + "/issues/" + id;
    const REG_STYLE = /( style="[^"]+")/gi;
    const REG_TARGET = /( target="[^"]+")/gi;
    // const REG_CLASS = /( class="[^"]+")/ig;
    // const REG_TABLE = /<(\/)?table[^>]*>/ig;
    const REG_ID = /( id="[^"]+")/gi;
    const REG_TBODY = /<(\/)?tbody>/gi;
    const REG_TR = /<(\/)?tr>/gi;
    const REG_TD = /<(\/)?td[^>]*>/gi;
    const REG_NOTES = /<!-[^>]+>/gi; // 匹配去掉注释
    const REG_N = /\n/g; // 匹配去掉换行符
    const REG_NAME = /<p class="name"[^\/]+(\/p>)/g; // 匹配去掉作者
    const REG_READ = `Read on the Web</a></p></div>`; // 去掉原链接跳转

    let weekly = new Weekly();
    const repo = getManager().getRepository(Weekly);
    if (cid === String(13)) {
      // python
      if (id === "latest") {
        url = mapData.uri + "/latest";
      }
      const { body } = await cgot(url);
      const $$title = body.match(/<title>([^<]+)<\/title>/)[1];
      const pid = $$title.split("#")[1];
      let $title = body.match(/"description" content="([^.]+)/)[1];
      const date = $title.split("published ")[1];
      let $content = body.split('"mcnTextContent"')[3].split("</td>")[0];
      $content = $content.replace(/(<br>)/g, "").replace(/(&ldquo;)/g, '"');
      $content = "<div" + $content + "</div>";
      title = title || $title;
      $content = await turndownService.turndown($content);
      const content_cn = await TranslateService.markdown($content);
      weekly.pid = pid;
      weekly.date = date;
      weekly.cid = cid;
      weekly.content = content;
      weekly.content_cn = content_cn;
      weekly.title = title;
      weekly.title_cn = await TranslateService.string(title);
      weekly.url = url;
      const data = await repo.save(weekly);
      return (ctx.body = data);
    }

    if (cid === String(14)) {
      // Vue
      if (id === "latest") {
        url = mapData.uri;
      }
      const { body } = await cgot(url);
      content = body.split('slide-transition">')[1];
      content = content.split('<div class="issues-nav">')[0];
      content = content
        .replace(/( data-v-[^>]+)/g, "")
        .replace(/(<!---->)/g, "")
        .replace(/( target="[^"]+")/gi, "")
        .replace(/\n/g, "");
      title = title || content.match(/issue-title">([^<]+)/)[1];
      const date = content.match(/issue-date">([^<]+)/)[1];
      const pid = content.match(/issues\/([\d]+)/)[1];
      content = await turndownService.turndown(content);
      const content_cn = await TranslateService.markdown(content);
      weekly.pid = pid;
      weekly.date = date;
      weekly.cid = cid;
      weekly.content = content;
      weekly.content_cn = content_cn;
      weekly.title = title;
      weekly.title_cn = await TranslateService.string(title);
      weekly.url = url;
      const data = await repo.save(weekly);
      return (ctx.body = data);
    }

    if (cid === String(15)) {
      // CSS
      url = `${mapData.uri}/issue-${id}/`;
      const { body } = await cgot(url);
      content = body.split('class="newsletter-head"')[1];
      let $title = content.split("</header>")[0];
      const pid = $title.match(/Issue #([\d]+)/)[1];
      const date = $title.match(/pubdate>([^<]+)/)[1];
      title = title || `Issue #${pid}`;
      content = content.split("<aside")[0];
      content = content
        .replace(/(\t|\n)/g, "")
        .replace(/( target="[^"]+")/gi, "")
        .replace(/( rel="[^"]+")/gi, "");
      content = content.split("</time></header>")[1];
      content = await turndownService.turndown(content);
      const content_cn = await TranslateService.markdown(content);
      weekly.pid = pid;
      weekly.date = date;
      weekly.cid = cid;
      weekly.content = content;
      weekly.content_cn = content_cn;
      weekly.title = title;
      weekly.title_cn = await TranslateService.string(title);
      weekly.url = url;
      const data = await repo.save(weekly);
      return (ctx.body = data);
    }

    if (cid === String(16)) {
      // cron
      url = `${mapData.uri}/issue-${id}/`;
      const { body } = await cgot(url);
      const date = body.match(/article:published_time" content="([^"]+)/)[1];
      const titles = body.match(/cron.weekly issue #([\d]+): ([^<]+)/);
      title = title || titles[2];
      const pid = titles[1];
      content = body.split("content blog-content cronweekly-content")[1];
      content = content.split('<aside class="hidden')[0];
      content = content
        .replace(/(\t|\n)/g, "")
        .replace(/( target="[^"]+")/gi, "")
        .replace(/( rel="[^"]+")/gi, "")
        .replace(REG_ID, "");
      content = '<div class="cronweekly-content' + content;
      content = await turndownService.turndown(content);
      const content_cn = await TranslateService.markdown(content);
      weekly.pid = pid;
      weekly.date = date;
      weekly.cid = cid;
      weekly.content = content;
      weekly.content_cn = content_cn;
      weekly.title = title;
      weekly.title_cn = await TranslateService.string(title);
      weekly.url = url;
      const data = await repo.save(weekly);
      return (ctx.body = data);
    }

    const { body } = await cgot(url);
    let $title = body.match(/<title>([^<]+)<\/title>/)[1];
    content = body.split('<div id="content">')[1];
    content = content.split(
      `<!--[if (gte mso 9)|(IE)]></td></tr></table><![endif]-->`
    )[0];
    content = content
      .replace(/(\n)/g, "")
      .replace("</div>  </td></tr></table>", "");

    const date = $title.split(": ")[1];
    const pid = $title.match(/( [\d]+):/)[1].trim();
    title = title || $title;

    content = content
      .replace(REG_TBODY, "")
      .replace(REG_TR, "")
      .replace(REG_TD, "")
      .replace(REG_NOTES, "")
      .replace(REG_TARGET, "")
      .replace(REG_STYLE, "")
      .replace(REG_N, "")
      .replace(/table/gi, "div")
      .replace(/( width="100%" cellpadding="0" cellspacing="0")/g, "")
      .replace(/<div><\/div>/g, "")
      .replace(REG_NAME, "")
      .split(REG_READ)[1];
    content = await turndownService.turndown(content);
    const content_cn = await TranslateService.markdown(content);
    weekly.pid = pid;
    weekly.date = date;
    weekly.cid = cid;
    weekly.content = content;
    weekly.content_cn = content_cn;
    weekly.title = title;
    weekly.title_cn = await TranslateService.string(title);
    weekly.url = mapData.uri + "/issues/" + pid;
    const data = await repo.save(weekly);
    return (ctx.body = data);
  }

  static async find(ctx) {
    const { cid = "1", pid = "" } = ctx.request.query;
    const repo = getManager().getRepository(Weekly);
    const where = pid ? { cid, pid } : { cid };
    let data: any = await repo.find({ where, order: { pid: "DESC" }, take: 1 });
    data = data.length ? data[0] : {};
    return (ctx.body = data);
  }
}

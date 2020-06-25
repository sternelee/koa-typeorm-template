import * as Got from "got";
import { UserAgent } from '../contant'

const Uri = "https://app.dailynow.co/";
const cgot = Got.extend({
  prefixUrl: Uri,
  headers: {
    'user-agent': UserAgent
  }
});

export default class DailyController {
  static async tags(ctx) {
    const res = await cgot("v1/feeds/tags");
    ctx.body = res.body;
  }

  static async settings(ctx) {
    const res = await cgot("v1/settings");
    ctx.body = res.body;
  }

  static async publications(ctx) {
    const res = await cgot("v1/publications");
    ctx.body = res.body;
  }

  static async popular(ctx) {
    const res = await cgot("v1/tags/popular");
    ctx.body = res.body;
  }

  static async me(ctx) {
    const res = await cgot("v1/users/me");
    ctx.body = res.body;
  }

  static async graphql(ctx) {
    const { query, variables } = ctx.request.query;
    const res = await cgot(
      `graphql?query=${query}&variables=${variables}`
    );
    ctx.body = res.body;
  }
}
import HomeService from '../service/home-service'

export default class HomeController {
  static async hello(ctx) {
    if (ctx.ws) {
      ctx.ws.send('来自Koa路由的信息')
    }
    ctx.body = await HomeService.hello();
  }
  static async we(ctx) {
    ctx.body = 'hello we123'
  }
  static async auth(ctx) {
    const grantAuth = ctx.session.grant.response
    ctx.body = {
      data: grantAuth,
      result: 'auth OK'
    }
  }
}

import GithubService from '../service/github-service'

export default class OauthController {
  static async auth(ctx) {
    const { code, state } = ctx.query
    const grantAuth = ctx.session.grant
    let data = null
    console.log(grantAuth)
    if (code) {
      data = await GithubService.token(code)
      console.log(data)
      ctx.session.github = data
    }
    ctx.body = {
      data,
      result: 'auth OK'
    }
  }

  static async user(ctx) {
    const user = await GithubService.user(ctx)
    ctx.body = user
  }
}

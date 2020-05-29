import * as jwt from 'jsonwebtoken'
import GithubService from '../service/github-service'
import jwtConf from '../config/jwt-conf'

export default class OauthController {
  static async auth(ctx) {
    const { code } = ctx.query
    const grantAuth = ctx.session.grant
    let token = ''
    let user = {}
    console.log(grantAuth)
    if (code) {
      const sessionKey = await GithubService.token(code)
      console.log(sessionKey)
      // ctx.session.token = sessionKey
      const userinfo = await GithubService.user(sessionKey)
      console.log(userinfo)
      user = {
        uid: 'gh_' + userinfo.id,
        uname: userinfo.name
      }
      // 需要查找用户, 没有则创建用户
      token = 'Bearer ' + jwt.sign(user, jwtConf.privateKey, {expiresIn: '7d'}) // 签发 token， 7天有效期
    }
    ctx.body = {
      code: 0,
      data: {
        user,
        token
      },
      message: 'auth OK'
    }
  }

  static async user(ctx) {
    const token = ctx.get('Authorization')
    if (token === '') {
      return ctx.body = {code: 1, message: '未登陆'}
    }
    try {
      const user = jwt.verify(token.split(' ')[1], jwtConf.privateKey)
      ctx.body = {code: 0, message: '已登陆', data: {user}}
    } catch(err) {
      ctx.body = {code: 1, message: '未登陆', data: {}}
    }
  }
}

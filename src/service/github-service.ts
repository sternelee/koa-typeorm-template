import { Context } from 'koa'
import axios from 'axios'
import grantConf from '../config/grant-conf'

const github = grantConf.github

export default class GithubService {
  static async token (code) {
    const { data } = await axios({
      url: `https://github.com/login/oauth/access_token?client_id=${github.key}&client_secret=${github.secret}&code=${code}`,
      method: 'POST',
      headers: {
        accept: 'application/json'
      }
    })
    return data
  }
  static async user (ctx: Context) {
    const { github } = ctx.session
    const { data } = await axios({
      url: 'https://api.github.com/user',
      method: 'GET',
      headers: {
        Authorization: `${github.token_type} ${github.access_token}`
      }
    })
    return data
  }
}

import HomeController from './controller/home-controller'
import OauthController from './controller/oauth-controller'

export default [
  {
    path: '/we',
    method: 'get',
    action: HomeController.we
  },
  {
    path: '/oauth/redirect',
    method: 'get',
    action: OauthController.auth
  },
  {
    path: '/oauth/user',
    method: 'get',
    action: OauthController.user
  }
]
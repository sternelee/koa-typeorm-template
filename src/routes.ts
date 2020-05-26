import HomeController from './controller/home-controller'

export default [
  {
    path: '/we',
    method: 'get',
    action: HomeController.we
  },
  {
    path: '/oauth/redirect',
    method: 'get',
    action: HomeController.auth
  }
]
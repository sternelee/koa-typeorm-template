import HomeController from './controller/home-controller'

export default [
  {
    path: '/',
    method: 'get',
    action: HomeController.hello
  },
  {
    path: '/we',
    method: 'get',
    action: HomeController.we
  }
]
import HomeController from "./controller/home-controller";
import OauthController from "./controller/oauth-controller";
import PostController from "./controller/post-controller";
import UserController from "./controller/user-controller";
import WeeklyController from "./controller/weekly-controller";

export default [
  {
    path: "/we",
    method: "get",
    action: HomeController.we,
  },
  {
    path: "/oauth/redirect",
    method: "get",
    action: OauthController.auth,
  },
  {
    path: "/oauth/user",
    method: "get",
    action: OauthController.user,
  },
  {
    path: "/post/create",
    method: "post",
    action: PostController.post,
  },
  {
    path: "/post/fetch",
    method: "get",
    action: PostController.fetch,
  },
  {
    path: "/post/find",
    method: "get",
    action: PostController.find,
  },
  {
    path: "/user/me",
    method: "get",
    action: UserController.get
  },
  {
    path: "/user/me",
    method: "post",
    action: UserController.post
  },
  {
    path: "/weekly/fetch",
    method: "get",
    action: WeeklyController.fetch
  },
  {
    path: "/weekly/find",
    method: "get",
    action: WeeklyController.find
  }
];

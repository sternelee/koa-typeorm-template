import HomeController from "./controller/home-controller";
import OauthController from "./controller/oauth-controller";
import PostController from "./controller/post-controller";
import DailyController from "./controller/daily-controller";
import UserController from "./controller/user-controller";

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
    path: "/daily/popular",
    method: "get",
    action: DailyController.popular,
  },
  {
    path: "/daily/tags",
    method: "get",
    action: DailyController.tags,
  },
  {
    path: "/daily/settings",
    method: "get",
    action: DailyController.settings,
  },
  {
    path: "/daily/publications",
    method: "get",
    action: DailyController.publications,
  },
  {
    path: "/daily/graphql",
    method: "get",
    action: DailyController.graphql,
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
  }
];

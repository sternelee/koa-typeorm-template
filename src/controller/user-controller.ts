import { getManager } from "typeorm";
import User from "../entity/User";
import UserService from "../service/user-service";

export default class UserController {
  static async get(ctx) {
    const { uid, platform } = ctx.request.query;
    const repo = getManager().getRepository(User);
    const hasUser = await repo.find({ where: { uid, platform }, take: 1 });
    if (hasUser.length) {
      const user = hasUser[0];
      const data = {
        ...user,
        tags: UserService.str2arr(user.tags),
        pubs: UserService.str2arr(user.pubs),
        favs: UserService.str2arr(user.favs),
      };
      await repo.update({ uid, platform }, { last_login: new Date() });
      return (ctx.body = {
        code: 0,
        result: "ok",
        data,
      });
    }
    const user = new User();
    user.uid = uid;
    user.platform = platform;
    user.pubs = "";
    user.favs = "";
    user.tags = "";
    user.create_time = new Date();
    await repo.save(user);
    return (ctx.body = {
      code: 1,
      result: "done",
      data: {
        ...user,
        tags: UserService.str2arr(user.tags),
        pubs: UserService.str2arr(user.pubs),
        favs: UserService.str2arr(user.favs),
      },
    });
  }

  static async post(ctx) {
    const {
      uid,
      platform,
      username = null,
      avatar = null,
      email = null,
      phone = null,
      tag = "",
      pub = "",
      fav = "",
    } = ctx.request.body;
    const user = new User();
    const repo = getManager().getRepository(User);
    const hasUser = await repo.findOne({ uid, platform });
    if (hasUser) {
      if (username) {
        user.username = username;
      }
      if (avatar) {
        user.avatar = avatar;
      }
      if (email) {
        user.email = email;
      }
      if (phone) {
        user.phone = phone;
      }
      if (tag) {
        user.tags = UserService.setStrs(hasUser.tags, tag);
      }
      if (pub) {
        user.pubs = UserService.setStrs(hasUser.pubs, pub);
      }
      if (fav) {
        user.favs = UserService.setStrs(hasUser.favs, fav);
      }
      await repo.update({ uid, platform }, user);
      return (ctx.body = {
        code: 1,
        result: "done",
        data: {
          ...user,
          tags: UserService.str2arr(user.tags),
          pubs: UserService.str2arr(user.pubs),
          favs: UserService.str2arr(user.favs),
        },
      });
    } else {
      return (ctx.body = {
        code: -1,
        result: "fail",
        data: null,
      });
    }
  }
}

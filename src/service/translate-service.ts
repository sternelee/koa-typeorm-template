import * as translate from "translate";
import { GoogleKey } from "../contant";

translate.key = GoogleKey;

export default class TranslateService {
  static async string(str: string) {
    const content = await translate(str, { to: "zh" });
    return content;
  }

  static async markdown(md: string) {
    const caches = []; //缓存链接不做翻译，使用$$$$代替
    const str = md.replace(/(\]\([^\)]+\))/g, function (match, captch) {
      caches.push(match.replace("]", ""));
      return "]$$$$";
    });
    try {
      let content = await translate(str, { to: "zh" });
      let index = 0
      content = content.replace(/(\${4})/g, function (match, captch) {
        index += 1
        return caches[index -1] + ' ';
      });
      // TODO: 中文要用转码后的utf8字段来替换
      return content.replace(/\【/g, '[').replace(/\】/g, ']').replace(/\（/g, '(').replace(/\）/g, ')').replace(/！/g, '!').replace(/\] \(/g, '](');
    } catch (err) {
      console.log(err)
      return null
    }
  }
}

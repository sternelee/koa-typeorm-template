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
    let content = await translate(str, { to: "zh" });
    content = content.replace(/(\${4})/g, function (match, captch) {
      return caches[captch];
    });
    return content;
  }
}

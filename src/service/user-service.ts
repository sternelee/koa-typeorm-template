export default class UserService {
  static str2arr(str: string) {
    return str ? str.split(",") : [];
  }
  static setStrs(arr: string, item: string) {
    let list = arr ? arr.split(",") : [];
    if (list.includes(item)) {
      list = list.filter((v) => v !== item);
    } else {
      list.push(item);
    }
    return list.join(",");
  }
}

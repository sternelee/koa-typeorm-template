import * as translate from "google-translate-api";
import * as ApiToken from "google-translate-token";


ApiToken.get('喜欢你').then(console.log);

translate('Ik spreek Engels', {to: 'en'}).then(res => {
  console.log(res.text);
  //=> I speak English
  console.log(res.from.language.iso);
  //=> nl
}).catch(err => {
  console.error(err);
});
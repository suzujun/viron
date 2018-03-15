const yaml = require('js-yaml');

let obj = {
  str: "asdf",
  int: 1234,
  date: Date.now(),
  array: ["asdf","ooo","ppp"],
  obj: {hoge:"fuga",piyo:999},
}
const swagger = yaml.safeDump(obj);

console.log(">>>>>>>>>>", swagger)
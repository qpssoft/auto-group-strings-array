const autoGroupStrings = require("auto-group-strings");

const result = autoGroupStrings(
  [
    "hello code", // 0
    "apple and orange", // 1
    "for the happy code", // 2
    "i don't know", // 3
    "is it?", // 4
    "it's a happy code", // 5
    "ok", // 6
    "you mean the happy code", // 7
  ],
  {
    delimiter: " ",
    direction: "rtl",
  },
);

console.log(result);
/*
[
  { common: 'code', members: [ 0, 2, 5, 7 ] },
  { common: 'happy code', members: [ 2, 5, 7 ] },
  { common: 'the happy code', members: [ 2, 7 ] }
]
*/

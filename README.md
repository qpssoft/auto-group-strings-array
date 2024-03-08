# auto-group-strings

[![](https://github.com/arafathusayn/auto-group-strings-js/workflows/test/badge.svg)](https://github.com/arafathusayn/auto-group-strings-js/actions?query=workflow%3Atest) [![](https://img.shields.io/codecov/c/github/arafathusayn/auto-group-strings-js/master)](https://codecov.io/github/arafathusayn/auto-group-strings-js?branch=master) [![](https://snyk.io/test/github/arafathusayn/auto-group-strings-js/badge.svg)](https://snyk.io/test/github/arafathusayn/auto-group-strings-js) [![](https://img.shields.io/node/v/auto-group-strings?label=node.js+version)](https://nodejs.org)

Small JS library to group array of strings by common substring

## Node.js

`npm install auto-group-strings`

## Browser

Use `auto-group-strings.min.js` file from [dist/](dist/)

### Function Arguments:

1. inputStrings (type: `Array<string>`)

2. options, type: `Object` (optional), properties:
    - **delimiter** (type: `string`, default: `" "`)
    - **delimiterRegExp** (type: `RegExp`, default: `undefined`)
      - if **delimiterRegExp** is provided, **delimiter** (`string`) will only be used as a fallback when there is no match for **delimiterRegExp**
    - **direction** (type: `string`, default: `"rtl"`)
      <br>
      - Its possible values are `"ltr"` for searching left to right or, `"rtl"` for right to left.
    - **caseSensitive** (type: `boolean`, default: `false`)
    - **includeSingleElementMembers** (type: `boolean`, default: `false`)
      - this option includes every input string from the first argument as **common** and at least one element (index) in **members** array. 

### Return Type:

- `Array<Object>` where
    - **`common`** property is a `string`
    - **`members`** property is an `Array<number>`

## Usage

```js
const autoGroupStrings = require("auto-group-strings");

const result = autoGroupStrings(
  [
    "hello code", // 0
    "apple and orange", // 1
    "for the happy code", // 2
    "i don't know", // 3
    "is it?", // 4
    "it's a happy code", // 5
  ],
  {
    delimiter: " ",
    direction: "rtl",
  },
);

console.log(result);
/*
[
  { common: 'code', members: [ 0, 2, 5 ] },
  { common: 'happy code', members: [ 2, 5 ] }
]
*/
```

- For more examples, please check [examples](examples/) directory.

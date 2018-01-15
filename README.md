# eslint-plugin-array-func

[![Greenkeeper badge](https://badges.greenkeeper.io/freaktechnik/eslint-plugin-array-func.svg)](https://greenkeeper.io/) [![Build Status](https://travis-ci.org/freaktechnik/eslint-plugin-array-func.svg?branch=master)](https://travis-ci.org/freaktechnik/eslint-plugin-array-func) [![codecov](https://codecov.io/gh/freaktechnik/eslint-plugin-array-func/branch/master/graph/badge.svg)](https://codecov.io/gh/freaktechnik/eslint-plugin-array-func)

Rules for Array functions and methods.

## Contents
 - [Installation](#installation)
 - [Rules](#rules)
   - [`from-map`](#from-map)
     - [Examples](#examples)
   - [`no-unnecessary-this-arg`](#no-unnecessary-this-arg)
     - [Checked Functions](#checked-functions)
     - [Checked Methods](#checked-methods)
     - [Examples](#examples-1)
   - [`prefer-array-from`](#prefer-array-from)
     - [Examples](#examples-2)
   - [`avoid-reverse`](#avoid-reverse)
     - [Examples](#examples-3)
 - [`array-func/recommended` Configuration](#array-funcrecommended-configuration)
   - [Using the Configuration](#using-the-configuration)
 - [License](#license)

## Installation

Install [ESLint](https://www.github.com/eslint/eslint) either locally or globally.

```sh
$ npm install -D eslint
```

If you installed `ESLint` globally, you have to install the `array-func` plugin globally too. Otherwise, install it locally.

```sh
$ npm install -D eslint-plugin-array-func
```

## Rules

### `from-map`
Prefer using the `mapFn` callback of `Array.from` over an immediate `.map()` call on the `Array.from` result.

`Array.from` has a `mapFn` callback that lets you map the items of the iterable to an array like you would with `.map()` except that values have not yet been truncated to fit types allowed in an array. Some iterables can't be directly converted to an array and thus have to be iterated either way. In that case using the mapping callback of `Array.from` avoids an iteration. See also [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#Description) for an explanation of the potential benefits of using the mapping callback of `Array.from` directly.

This rule is auto fixable. It will produce nested function calls if you use the `Array.from` map callback and have a `.map()` call following it.

#### Examples
Code that triggers this rule:
```js
Array.from(iterable).map((t) => t.id);

Array.from(iterable, (t) => t.id).map((id) => id[0]);
```

Code that doesn't trigger this rule:
```js
Array.from(iterable, (t) => t.id);

Array.from(iterable, function(t) { this.format(t); }, this);

const arr = Array.from(iterable);
const mappedArray = arr.map((t) => t.id);
```

### `no-unnecessary-this-arg`
Avoid the `this` parameter when providing arrow function as callback in array functions.

The `this` parameter is useless when providing arrow functions, since the `this` of arrow functions can not be rebound, thus the parameter has no effect.

The fix is usually to omit the parameter. The Array methods can't be auto-fixed, since the detection of array methods is not confident enough to know that the method is being called on an array.

#### Checked Functions
 - `from` (fixable)

#### Checked Methods
 - `every`
 - `filter`
 - `find`
 - `findIndex`
 - `forEach`
 - `map`
 - `some`

#### Examples
Code that triggers this rule:
```js
const array = Array.from("example", (char) => char.charCodeAt(0), this);

const e = array.find((char) => char === 101, this);

const exampleAsArray = array.map((char) => String.fromCharCode(char), this);

const eIndex = array.findIndex((char) => char === 101, this);

const containsE = array.some((char) => char === 101, this);

const isOnlyE = array.every((char) => char === 101, this);

const onlyEs = array.filter((char) => char === 101, this);

array.forEach((char) => console.log(char), this);
```

Code that doesn't trigger this rule:
```js
const array = Array.from("example", (char) => char.charCodeAt(0));
const alternateArray = Array.from("example", function(char) {
    return char.charCodeAt(this)
}, 0);

const e = array.find((char) => char === 101);

const exampleAsArray = array.map((char) => String.fromCharCode(char));

const eIndex = array.findIndex((char) => char === 101);

const containsE = array.some((char) => char === 101);

const isOnlyE = array.every((char) => char === 101);

const onlyEs = array.filter(function(char) {
    return char === this
}, 101);

array.forEach(function(char) {
    this.log(char);
}, console);

array.filter(this.isGood, this);
```

### `prefer-array-from`
Use `Array.from` instead of `[...iterable]` for performance benefits.

This rule is auto fixable.

#### Examples
Code that triggers this rule:
```js
const iterable = [..."string"];

const arrayCopy = [...iterable];
```

Code that doesn't trigger this rule:
```js
const array = [1, 2, 3];

const extendedArray =  [0, ...array];

const arrayCopy = Array.from(array);

const characterArray = Array.from("string");
```

### `avoid-reverse`
Avoid reversing the array and running a method on it if there is an equivalent
of the method operating on the array from the other end.

There are two operations with such equivalents: `indexOf` with `lastIndexOf` and
`reduce` with `reduceRight`.

This rule is auto fixable.

#### Examples
Code that triggers this rule:
```js
const lastIndex = array.reverse().indexOf(1);

const firstIndex = array.reverse().lastIndexOf(1);

const sum = array.reverse().reduce((p, c) => p + c, 0);

const reverseSum = array.reverse().reduceRight((p, c) => p + c, 0);
```

Code that doesn't trigger this rule:
```js
const lastIndex = array.lastIndexOf(1);

const firstIndex = array.indexOf(1);

const sum = array.reduce((p, c) => p + c, 0);

const reverseSum = array.reduceRight((p, c) => p + c, 0);

const reverseArray = array.reverse();

const reverseMap = array.reverse().map((r) => r + 1);
```

## `array-func/recommended` Configuration
The recommended configuration will set your parser ECMA Version to 2015, since that's when the Array functions and methods were added.

Rule | Error level | Fixable
---- | ----------- | -------
`from-map` | Error | Yes
`no-unnecessary-this-arg` | Error | Sometimes
`prefer-array-from` | Error | Yes
`avoid-reverse` | Error | Yes

### Using the Configuration
To enable this configuration use the `extends` property in your `.eslintrc.json` config file (may look different for other config file styles):
```json
{
    "extends": [
        "array-func/recommended"
    ]
}
```

## License
The `array-func` plugin is licensed under the [MIT License](LICENSE).

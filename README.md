# eslint-plugin-array-func

[![Greenkeeper badge](https://badges.greenkeeper.io/freaktechnik/eslint-plugin-array-func.svg)](https://greenkeeper.io/) [![Build Status](https://travis-ci.org/freaktechnik/eslint-plugin-array-func.svg?branch=master)](https://travis-ci.org/freaktechnik/eslint-plugin-array-func) [![codecov](https://codecov.io/gh/freaktechnik/eslint-plugin-array-func/branch/master/graph/badge.svg)](https://codecov.io/gh/freaktechnik/eslint-plugin-array-func)

Rules for Array functions and methods.

## Rules

### `from-map`
Prefer using the `mapFn` callback of `Array.from` over an immediate `.map()` call.

This rule is auto fixable. It will produce nested function calls if you use the `Array.from` map callback and have a `.map()` call following it.

### `no-unnecessary-this-arg`
Avoid the `this` parameter when providing arrow function as callback in array functions.

#### Checked functions
 - `from` (fixable)

#### Checked methods
 - `every`
 - `filter`
 - `find`
 - `findIndex`
 - `forEach`
 - `map`
 - `some`

## `array-func/recommended` Configuration
The recommended configuration will set your parser ECMA Version to 2015, since that's when the Array functions and methods were added.

Rule | Error level
---- | -----------
`from-map` | Error
`no-unnecessary-this-arg` | Error

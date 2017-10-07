# eslint-plugin-array-func

[![Greenkeeper badge](https://badges.greenkeeper.io/freaktechnik/eslint-plugin-array-func.svg)](https://greenkeeper.io/) [![Build Status](https://travis-ci.org/freaktechnik/eslint-plugin-array-func.svg?branch=master)](https://travis-ci.org/freaktechnik/eslint-plugin-array-func)

Rules for Array functions and methods.

## Rules

### `from-map`
Prefer using the `mapFn` callback of `Array.from` over an immediate `.map()` call.

### `no-unnecessary-this-arg`
Avoid the `this` parameter when providing arrow function as callback in array functions.

#### Checked functions
 - `from`

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

# eslint-plugin-array-func

[![Greenkeeper badge](https://badges.greenkeeper.io/freaktechnik/eslint-plugin-array-func.svg)](https://greenkeeper.io/) [![Build Status](https://travis-ci.org/freaktechnik/eslint-plugin-array-func.svg?branch=master)](https://travis-ci.org/freaktechnik/eslint-plugin-array-func)

Rules for Array functions and methods.

## Rules

### `from-map`
Checks that mapping of iterator items is done in the map function callback in `Array.from` and not in a directly following `.map()` call.

### `no-unnecessary-this-arg`
Warns about a `this` argument being provided to Array functions and methods when an arrow function is provided as callback.

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

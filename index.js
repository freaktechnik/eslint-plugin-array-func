/**
 * @author Martin Giger
 * @license MIT
 */
"use strict";

module.exports = {
    rules: {
        "from-map": require("./rules/from-map"),
        "no-unnecessary-this-arg": require("./rules/no-unnecessary-this-arg"),
        "prefer-array-from": require("./rules/prefer-array-from"),
        "avoid-reverse": require("./rules/avoid-reverse"),
        "prefer-flat-map": require("./rules/prefer-flat-map"),
        "prefer-flat": require("./rules/prefer-flat")
    },
    configs: {
        recommended: {
            parserOptions: {
                ecmaVersion: 2015
            },
            plugins: [ 'array-func' ],
            rules: {
                "array-func/from-map": "error",
                "array-func/no-unnecessary-this-arg": "error",
                "array-func/prefer-array-from": "error",
                "array-func/avoid-reverse": "error"
            }
        },
        all: {
            parserOptions: {
                ecmaVersion: 2018
            },
            plugins: [ 'array-func' ],
            rules: {
                "array-func/prefer-flat-map": "error",
                "array-func/prefer-flat": "error"
            },
            extends: [ 'plugin:array-func/recommended' ]
        }
    }
};

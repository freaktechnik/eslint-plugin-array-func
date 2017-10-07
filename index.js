/**
 * @author Martin Giger
 * @license MIT
 */
"use strict";

module.exports = {
    rules: {
        "from-map": require("./rules/from-map"),
        "no-unnecessary-this-arg": require("./rules/no-unnecessary-this-arg")
    },
    configs: {
        recommended: {
            parserOptions: {
                ecmaVersion: 2015
            },
            plugins: [ 'array-func' ],
            rules: {
                "array-func/from-map": "error",
                "array-func/no-unnecessary-this-arg": "error"
            }
        }
    }
};

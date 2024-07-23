/**
 * @license MIT
 * @author Martin Giger
 */
import fromMap from "./rules/from-map.js";
import noUnnecessaryThisArgument from "./rules/no-unnecessary-this-arg.js";
import preferArrayFrom from "./rules/prefer-array-from.js";
import avoidReverse from "./rules/avoid-reverse.js";
import preferFlatMap from "./rules/prefer-flat-map.js";
import preferFlat from "./rules/prefer-flat.js";

const index = {
    meta: {
        name: "eslint-plugin-array-func",
        version: "5.0.1",
    },
    rules: {
        "from-map": fromMap,
        "no-unnecessary-this-arg": noUnnecessaryThisArgument,
        "prefer-array-from": preferArrayFrom,
        "avoid-reverse": avoidReverse,
        "prefer-flat-map": preferFlatMap,
        "prefer-flat": preferFlat,
    },
    configs: {},
};
index.configs.recommended = {
    name: 'array-func/recommended',
    plugins: { "array-func": index },
    rules: {
        "array-func/from-map": "error",
        "array-func/no-unnecessary-this-arg": "error",
        "array-func/prefer-array-from": "error",
        "array-func/avoid-reverse": "error",
    },
};
index.configs.all = {
    name: 'array-func/all',
    plugins: { "array-func": index },
    rules: {
        "array-func/from-map": "error",
        "array-func/no-unnecessary-this-arg": "error",
        "array-func/prefer-array-from": "error",
        "array-func/avoid-reverse": "error",
        "array-func/prefer-flat-map": "error",
        "array-func/prefer-flat": "error",
    },
};

export default index;

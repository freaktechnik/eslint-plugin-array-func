/**
 * @license MIT
 * @author Martin Giger
 */
import fromMap from "./rules/from-map";
import noUnnecessaryThisArg from "./rules/no-unnecessary-this-arg";
import preferArrayFrom from "./rules/prefer-array-from";
import avoidReverse from "./rules/avoid-reverse";
import preferFlatMap from "./rules/prefer-flat-map";
import preferFlat from "./rules/prefer-flat";

const index = {
    rules: {
        "from-map": fromMap,
        "no-unnecessary-this-arg": noUnnecessaryThisArg,
        "prefer-array-from": preferArrayFrom,
        "avoid-reverse": avoidReverse,
        "prefer-flat-map": preferFlatMap,
        "prefer-flat": preferFlat,
    },
    configs: {
        recommended: {
            plugins: { "array-func": index },
            rules: {
                "array-func/from-map": "error",
                "array-func/no-unnecessary-this-arg": "error",
                "array-func/prefer-array-from": "error",
                "array-func/avoid-reverse": "error"
            }
        },
        all: {
            plugins: { "array-func": index },
            rules: {
                "array-func/from-map": "error",
                "array-func/no-unnecessary-this-arg": "error",
                "array-func/prefer-array-from": "error",
                "array-func/avoid-reverse": "error",
                "array-func/prefer-flat-map": "error",
                "array-func/prefer-flat": "error"
            }
        }
    }
};

export default index;

import freaktechnikConfigNode from "@freaktechnik/eslint-config-node";
import freaktechnikConfigTest from "@freaktechnik/eslint-config-test";
import eslintPlugin from "eslint-plugin-eslint-plugin";

export default [
    ...freaktechnikConfigNode,
    ...freaktechnikConfigTest,
    {
        files: [ "**" ],
        rules: {
            "unicorn/prefer-module": "off",
        },
    },
    {
        files: ["rules/*.js"],
        ...eslintPlugin.configs["flat/recommended"],
    },
    {
        files: [ "test/rules/*.mjs" ],
        ...eslintPlugin.configs["flat/tests-recommended"],
    },
];

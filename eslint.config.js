import freaktechnikConfigNode from "@freaktechnik/eslint-config-node";
import freaktechnikConfigTest from "@freaktechnik/eslint-config-test";
import eslintPlugin from "eslint-plugin-eslint-plugin";

export default [
    ...freaktechnikConfigNode,
    eslintPlugin.configs["flat/recommended"],
    ...freaktechnikConfigTest,
    {
        files: ["**"],
        rules: {
            "unicorn/prefer-module": "off"
        }
    },
    {
        files: ["test/rules/*.mjs"],
        ...eslintPlugin.configs["flat/tests-recommended"]
    }
];

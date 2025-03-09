import AvaRuleTester from "eslint-ava-rule-tester";
import test from "ava";
import rule from "../../rules/from-map.js";
import testCases from '../helpers/from-map-test-cases.mjs';
import typescriptParser from "@typescript-eslint/parser";

const ruleTester = new AvaRuleTester(test, {
    languageOptions: {
        parser: typescriptParser,
        ecmaVersion: 2020,
        sourceType: 'module',
    },
});

ruleTester.run('from-map', rule, testCases);

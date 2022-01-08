import AvaRuleTester from "eslint-ava-rule-tester";
import test from "ava";
import rule from "../../rules/from-map.js";
import testCases from '../helpers/from-map-test-cases.mjs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const ruleTester = new AvaRuleTester(test, {
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
    }
});

ruleTester.run('from-map', rule, testCases);

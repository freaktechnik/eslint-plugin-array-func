import AvaRuleTester from "eslint-ava-rule-tester";
import test from "ava";
import rule from "../../rules/from-map";
import testCases from '../helpers/from-map-test-cases';

const ruleTester = new AvaRuleTester(test, {
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
    }
});

ruleTester.run('from-map', rule, testCases);

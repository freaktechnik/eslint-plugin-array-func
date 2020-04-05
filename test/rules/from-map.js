import test from 'ava';
import AvaRuleTester from 'eslint-ava-rule-tester';
import rule from '../../rules/from-map';
import testCases from "../helpers/from-map-test-cases";

const ruleTester = new AvaRuleTester(test, {
    parserOptions: {
        ecmaVersion: 2015
    }
});

ruleTester.run('from-map', rule, testCases);

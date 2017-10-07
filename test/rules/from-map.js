import test from 'ava';
import AvaRuleTester from 'eslint-ava-rule-tester';
import rule from '../../rules/from-map';

const ruleTester = new AvaRuleTester(test, {
    parserOptions: {
        ecmaVersion: 2015
    }
});

ruleTester.run('from-map', rule, {
    valid: [
        'array.map((t) => t.id)',
        'Array.from(iterable).some((t) => t !== "a")',
        'Array.from(iterable, (t) => t.id)'
    ],
    invalid: [
        {
            code: 'Array.from(iterable).map((t) => t.id)',
            errors: [ {
                message: 'Use mapFn callback of Array.from instead of map()',
                column: 1,
                line: 1
            } ],
            output: 'Array.from(iterable, (t) => t.id)'
        },
        {
            code: 'Array.from(iterable, (t) => t.id, a).map((t) => t[0], b)',
            errors: [ {
                message: 'Use mapFn callback of Array.from instead of map()',
                column: 1,
                line: 1
            } ],
            output: 'Array.from(iterable, (t) => ((t) => t[0])(((t) => t.id)(t)), a)'
        },
        {
            code: 'Array.from(iterable, function(t) { return t.id; }, a).map((t) => t[0])',
            errors: [ {
                message: 'Use mapFn callback of Array.from instead of map()',
                column: 1,
                line: 1
            } ],
            output: 'Array.from(iterable, function(t) { return ((t) => t[0])((function(t) { return t.id; }).call(this, t)); }, a)'
        },
        {
            code: 'Array.from(iterable, function(t) { return t.id; }, a).map(function(t) { return t[0]; }, b)',
            errors: [ {
                message: 'Use mapFn callback of Array.from instead of map()',
                column: 1,
                line: 1
            } ],
            output: 'Array.from(iterable, function(t) { return (function(t) { return t[0]; }).call(b, (function(t) { return t.id; }).call(this, t)); }, a)'
        }
    ]
});

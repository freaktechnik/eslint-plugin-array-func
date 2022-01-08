import test from 'ava';
import AvaRuleTester from 'eslint-ava-rule-tester';
import rule from '../../rules/no-unnecessary-this-arg.js';

const ruleTester = new AvaRuleTester(test, {
    parserOptions: {
        ecmaVersion: 2015
    }
});

ruleTester.run('no-unnecessary-this-arg', rule, {
    valid: [
        'array.map((t) => t.id)',
        'array.some((t) => t !== "a")',
        'Array.from(iterable, (t) => t.id)',
        'array.map(function(t) { return t.id; }, b)',
        'Array.from(iterable, function(t) { return t.id; }, b)',
        'array.filter(this.isGood, this)'
    ],
    invalid: [
        {
            code: 'Array.from(iterable, (t) => t.id, b)',
            errors: [ {
                message: "Unnecessary this argument 'b' with arrow function as callback to Array.from",
                column: 35,
                line: 1
            } ],
            output: 'Array.from(iterable, (t) => t.id)'
        },
        {
            code: 'array.map((t) => t.id, a)',
            errors: [ {
                message: "Unnecessary this argument 'a' with an arrow function as callback to map",
                column: 24,
                line: 1
            } ],
            output: null
        },
        {
            code: 'array.some((t) => t.id, b)',
            errors: [ {
                message: "Unnecessary this argument 'b' with an arrow function as callback to some",
                column: 25,
                line: 1
            } ],
            output: null
        },
        {
            code: 'array.filter((t) => t.id, 2)',
            errors: [ {
                message: "Unnecessary this argument '2' with an arrow function as callback to filter",
                column: 27,
                line: 1
            } ],
            output: null
        },
        {
            code: 'array.filter((t) => t.id, null)',
            errors: [ {
                message: "Unnecessary this argument 'null' with an arrow function as callback to filter",
                column: 27,
                line: 1
            } ],
            output: null
        }
    ]
});

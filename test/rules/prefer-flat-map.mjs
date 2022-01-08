import test from 'ava';
import AvaRuleTester from 'eslint-ava-rule-tester';
import rule from '../../rules/prefer-flat-map.js';

const ruleTester = new AvaRuleTester(test, {
    parserOptions: {
        ecmaVersion: 2018
    }
});

ruleTester.run('prefer-flat-map', rule, {
    valid: [
        'array.flatMap((m) => m)',
        'array.flat()',
        'array.map((r) => r + 1)',
        'array.flat().map((r) => r + 1)',
        'array.map((r) => r + 1).reverse().flat()',
        'array.map((p) => p).flat(99)'
    ],
    invalid: [
        {
            code: 'array.map((p) => p).flat()',
            errors: [ {
                message: 'Use flatMap instead of .map().flat()',
                column: 7,
                line: 1
            } ],
            output: 'array.flatMap((p) => p)'
        },
        {
            code: 'foo(); array.map((p) => p).flat(); test();',
            errors: [ {
                message: 'Use flatMap instead of .map().flat()',
                column: 14,
                line: 1
            } ],
            output: 'foo(); array.flatMap((p) => p); test();'
        },
        {
            code: 'array.map((r) => r).flat(1)',
            errors: [ {
                message: 'Use flatMap instead of .map().flat()',
                column: 7,
                line: 1
            } ],
            output: 'array.flatMap((r) => r)'
        }
    ]
});

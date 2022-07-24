import test from 'ava';
import AvaRuleTester from 'eslint-ava-rule-tester';
import rule from '../../rules/prefer-flat.js';

const ruleTester = new AvaRuleTester(test, {
    parserOptions: {
        ecmaVersion: 2018
    }
});

ruleTester.run('prefer-flat', rule, {
    valid: [
        'array.flat()',
        'array.reduce((p, n) => n.concat(p), [])',
        'array.reduce((p, n) => n + p, 0)',
        'array.reduce((p, []) => p.concat({}), [])',
        'array.reduce((p, n) => p.concat(n), [1])',
        'array.reduce((p, n) => p.concat(n))',
        'array.reduce((p, n) => p.concat(n, n), [])'
    ],
    invalid: [
        {
            code: '[].concat(...array)',
            errors: [ {
                messageId: 'preferFlat',
                column: 1,
                line: 1
            } ],
            output: 'array.flat()'
        },
        {
            code: 'array.reduce((p, n) => p.concat(n), [])',
            errors: [ {
                messageId: 'preferFlat',
                column: 1,
                line: 1
            } ],
            output: 'array.flat()'
        }
    ]
});

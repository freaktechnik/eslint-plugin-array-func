import test from 'ava';
import AvaRuleTester from 'eslint-ava-rule-tester';
import rule from '../../rules/prefer-array-from.js';

const ruleTester = new AvaRuleTester(test, {
    languageOptions: {
        ecmaVersion: 2015,
    },
});

ruleTester.run('perfer-array-from', rule, {
    valid: [
        'Array.from(new Set())',
        'Array.from(iterable)',
        '[1, ...iterable]',
        '[1, 2, 3]',
        '[iterable]',
    ],
    invalid: [
        {
            code: '[...iterable]',
            errors: [ {
                messageId: "preferArrayFrom",
                column: 1,
                line: 1,
            } ],
            output: 'Array.from(iterable)',
        },
        {
            code: '[...[1, 2]]',
            errors: [ {
                messageId: "preferArrayFrom",
                column: 1,
                line: 1,
            } ],
            output: 'Array.from([1, 2])',
        },
        {
            code: '[..."test"]',
            errors: [ {
                messageId: "preferArrayFrom",
                column: 1,
                line: 1,
            } ],
            output: 'Array.from("test")',
        },
    ],
});

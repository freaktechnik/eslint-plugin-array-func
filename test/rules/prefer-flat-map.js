import test from 'ava';
import AvaRuleTester from 'eslint-ava-rule-tester';
import rule from '../../rules/prefer-flat-map';

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
        'array.map((r) => r + 1).flat()',
        'array.flat().reverse().map((r) => r + 1)'
    ],
    invalid: [ {
        code: 'array.flat().map((p) => p)',
        errors: [ {
            message: 'Use flatMap instead of .flat().map()',
            column: 7,
            line: 1
        } ],
        output: 'array.flatMap((p) => p)'
    } ]
});

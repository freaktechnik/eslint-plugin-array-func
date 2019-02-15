import test from 'ava';
import AvaRuleTester from 'eslint-ava-rule-tester';
import rule from '../../rules/avoid-reverse';

const ruleTester = new AvaRuleTester(test, {
    parserOptions: {
        ecmaVersion: 2015
    }
});

ruleTester.run('avoid-reverse', rule, {
    valid: [
        'array.lastIndexOf(1)',
        'array.indexOf(1)',
        'array.reduce((p, c) => p + c, 0)',
        'array.reduceRight((p, c) => p + c, 0)',
        'array.reverse()',
        'array.reverse().map((r) => r + 1)'
    ],
    invalid: [
        {
            code: 'array.reverse().reduce((p, c) => p + c, 0)',
            errors: [ {
                message: 'Prefer using reduceRight over reversing the array and reduce',
                column: 7,
                line: 1
            } ],
            output: 'array.reduceRight((p, c) => p + c, 0)'
        },
        {
            code: 'array.reverse().reduceRight((p, c) => p + c, 0)',
            errors: [ {
                message: 'Prefer using reduce over reversing the array and reduceRight',
                column: 7,
                line: 1
            } ],
            output: 'array.reduce((p, c) => p + c, 0)'
        }
    ]
});

import test from 'ava';
import AvaRuleTester from 'eslint-ava-rule-tester';
import rule from '../../rules/avoid-reverse.js';

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
                messageId: 'avoidReverse',
                column: 7,
                line: 1,
                data: {
                    reversed: 'reduceRight',
                    methodName: 'reduce'
                }
            } ],
            output: 'array.reduceRight((p, c) => p + c, 0)'
        },
        {
            code: 'array.reverse().reduceRight((p, c) => p + c, 0)',
            errors: [ {
                messageId: 'avoidReverse',
                column: 7,
                line: 1,
                data: {
                    reversed: 'reduce',
                    methodName: 'reduceRight'
                }
            } ],
            output: 'array.reduce((p, c) => p + c, 0)'
        }
    ]
});

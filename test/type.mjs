import test from 'ava';
import {
    ARROW_FUNCTION_EXPRESSION,
    MEMBER_EXPRESSION,
    IDENTIFIER,
} from '../lib/type.js';

test('Arrow function expression', (t) => {
    t.is(ARROW_FUNCTION_EXPRESSION, "ArrowFunctionExpression");
});

test('Member expression', (t) => {
    t.is(MEMBER_EXPRESSION, "MemberExpression");
});

test('Identifier', (t) => {
    t.is(IDENTIFIER, "Identifier");
});

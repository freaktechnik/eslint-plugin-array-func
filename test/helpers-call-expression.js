import test from 'ava';
import {
    isMethod, getParent, isOnObject
} from '../lib/helpers/call-expression';
import {
    MEMBER_EXPRESSION, IDENTIFIER
} from '../lib/type';

test('is method', (t) => {
    const name = "test";
    t.true(isMethod({
        callee: {
            type: MEMBER_EXPRESSION,
            property: {
                name
            }
        }
    }, name));
});

test('not is method', (t) => {
    const name = 'test';
    t.false(isMethod({}, name));
    t.false(isMethod({
        callee: {
            type: IDENTIFIER,
            property: {
                name
            }
        }
    }, name));
    t.false(isMethod({
        callee: {
            type: MEMBER_EXPRESSION,
            property: {
                name: 'foo'
            }
        }
    }));
});

test('get parent', (t) => {
    const parent = 'foo';
    t.is(getParent({
        callee: {
            object: parent
        }
    }), parent);
});

test('is on object', (t) => {
    const name = 'test';
    t.true(isOnObject({
        callee: {
            object: {
                type: IDENTIFIER,
                name
            }
        }
    }, name));
});

test('is not on object', (t) => {
    const name = 'test';
    t.false(isOnObject({
        callee: {}
    }, name));
    t.false(isOnObject({
        callee: {
            type: MEMBER_EXPRESSION,
            name
        }
    }, name));
    t.false(isOnObject({
        callee: {
            type: IDENTIFIER,
            name: 'foo'
        }
    }, name));
});

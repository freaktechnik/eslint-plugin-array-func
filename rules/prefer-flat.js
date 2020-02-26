/**
 * @author Martin Giger
 * @license MIT
 */
"use strict";

//TODO no works.

const
    firstElement = ([ first ]) => first,
    secondElement = ([
        , second
    ]) => second;

module.exports = {
    meta: {
        docs: {
            description: "Prefer using .flat() over concating to flatten an array.",
            recommended: true
        },
        schema: [],
        fixable: "code",
        type: "suggestion"
    },
    create(context) {
        return {
            'CallExpression[callee.type="MemberExpression"][callee.property.name="concat"][callee.object.type="ArrayExpression"][callee.object.elements.length=0] > SpreadElement'(node) {
                node = node.parent;
                context.report({
                    node,
                    message: "Use flat to flatten an array",
                    fix(fixer) {
                        const sourceCode = context.getSourceCode();
                        //TODO could be an iterable, so Array.from may be needed.
                        return fixer.replaceText(node, `${sourceCode.getText(firstElement(node.arguments).argument)}.flat()`);
                    }
                });
            },
            'CallExpression[callee.type="MemberExpression"][callee.property.name="reduce"][arguments.length=2][arguments.1.type=ArrayExpression][arguments.1.elements.length=0] > *:function[params.length=2][params.0.type=Identifier][params.1.type=Identifier] > CallExpression[callee.type="MemberExpression"][callee.property.name="concat"][arguments.length=1][arguments.0.type=Identifier]'(node) {
                const reduceCallbackParameters = node.parent.params;

                // arr.reducer((a, b) => a.concat(b), [])
                // "concat" function must be called on "a" and concat argument must be "b".
                if(
                    firstElement(node.arguments).name === secondElement(reduceCallbackParameters).name &&
                    node.callee.object.name === firstElement(reduceCallbackParameters).name
                ) {
                    context.report({
                        node: node.parent.parent,
                        message: "Use flat to flatten an array",
                        fix(fixer) {
                            const sourceCode = context.getSourceCode();
                            return fixer.replaceText(node.parent.parent, `${sourceCode.getText(node.parent.parent.callee.object)}.flat()`);
                        }
                    });
                }
            }
        };
    }
};

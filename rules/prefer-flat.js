/**
 * @author Martin Giger
 * @license MIT
 */
"use strict";

//TODO no works.

const firstElement = (arr) => {
        const [ el ] = arr;
        return el;
    },
    SECOND = 1;

module.exports = {
    meta: {
        docs: {
            description: "Prefer using .flat() over concating to flatten an array.",
            recommended: true
        },
        schema: [],
        fixable: "code"
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
            'CallExpression[callee.type="MemberExpression"][callee.property.name="reduce"] > *:function > CallExpression[callee.type="MemberExpression"][callee.property.name="concat"]'(node) {
                if(node.parent.parent.arguments.length > SECOND && node.parent.parent.arguments[SECOND].type === "ArrayExpression" &&
                    firstElement(node.arguments).name === node.parent.params[SECOND].name &&
                    node.callee.object.name === firstElement(node.parent.params).name) {
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

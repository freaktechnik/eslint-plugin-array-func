// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-magic-numbers */
/**
 * @author Martin Giger
 * @license MIT
 */
"use strict";

//TODO no works.

const firstElement = (arr) => {
    const [ el ] = arr;
    return el;
};

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
            'CallExpression[callee.type="MemberExpression"][callee.property.name="reduce"] > *:function > CallExpression[callee.type="MemberExpression"][callee.property.name="concat"]'(node) {
                const concatFunction = node,
                    reduceFunction = node.parent.parent,
                    reduceCallbackParams = node.parent.params;

                // reduce function must have two args
                if(reduceFunction.arguments.length !== 2) {
                    return;
                }

                // reduce callback arguments must be 2 and all must be Identifier
                if(reduceCallbackParams.length !== 2 || reduceCallbackParams[0].type !== 'Identifier' || reduceCallbackParams[1].type !== 'Identifier') {
                    return;
                }

                // reduce function must have empty array as initial values
                if(reduceFunction.arguments[1].type !== "ArrayExpression" || reduceFunction.arguments[1].elements.length !== 0) {
                    return;
                }

                // concat function must have one argument which must be variable
                if(concatFunction.arguments.length !== 1 || concatFunction.arguments[0].type !== 'Identifier') {
                    return;
                }

                // concat callee object name must be same as reducer callback accumulator and
                // concat argument must be same as reducer callback item
                if(concatFunction.arguments[0].name !== reduceCallbackParams[1].name ||
                    node.callee.object.name !== reduceCallbackParams[0].name
                ) {
                    return;
                }

                context.report({
                    node: node.parent.parent,
                    message: "Use flat to flatten an array",
                    fix(fixer) {
                        const sourceCode = context.getSourceCode();
                        return fixer.replaceText(node.parent.parent, `${sourceCode.getText(node.parent.parent.callee.object)}.flat()`);
                    }
                });
            }
        };
    }
};

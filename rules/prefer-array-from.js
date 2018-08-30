/**
 * @author Martin Giger
 * @license MIT
 */
"use strict";

const firstElement = (arr) => {
    const [ el ] = arr;
    return el;
};

module.exports = {
    meta: {
        docs: {
            description: "Prefer using Array.from over spreading an iterable in an array literal.",
            recommended: true
        },
        schema: [],
        fixable: "code"
    },
    create(context) {
        return {
            "ArrayExpression > SpreadElement:first-child:last-child"(node) {
                node = node.parent;
                context.report({
                    node,
                    message: "Use Array.from to convert from iterable to array",
                    fix(fixer) {
                        const sourceCode = context.getSourceCode();
                        return fixer.replaceText(node, `Array.from(${sourceCode.getText(firstElement(node.elements).argument)})`);
                    }
                });
            }
        };
    }
};

/**
 * @author Martin Giger
 * @license MIT
 */
"use strict";

const firstElement = (array) => {
    const [ element ] = array;
    return element;
};

module.exports = {
    meta: {
        docs: {
            description: "Prefer using Array.from over spreading an iterable in an array literal. Using Array.from also preserves the original type of TypedArrays while mapping.",
            recommended: true
        },
        schema: [],
        fixable: "code",
        type: "problem"
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

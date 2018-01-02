/**
 * @author Martin Giger
 * @license MIT
 */
"use strict";

const { SPREAD_ELEMENT } = require("../lib/type");

const SINGLE_ELEMENT = 1,
    firstElement = (arr) => {
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
            "ArrayExpression:exit"(node) {
                if(node.elements.length !== SINGLE_ELEMENT || firstElement(node.elements).type !== SPREAD_ELEMENT) {
                    return;
                }
                context.report({
                    node,
                    loc: node.loc,
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

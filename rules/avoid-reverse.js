/**
 * @author Martin Giger
 * @license MIT
 */
"use strict";

const {
    isMethod,
    getParent
} = require("../lib/helpers/call-expression");

const REPLACEMENTS = {
    indexOf: "lastIndexOf",
    reduce: "reduceRight",
    lastIndexOf: "indexOf",
    reduceRight: "reduce"
};

module.exports = {
    meta: {
        docs: {
            description: "Prefer methods operating from the right over reversing the array",
            recommended: true
        },
        schema: [],
        fixable: "code"
    },
    create(context) {
        return {
            "CallExpression:exit"(node) {
                if(Object.keys(REPLACEMENTS).every((m) => !isMethod(node, m))) {
                    return;
                }

                const parent = getParent(node);
                if(!isMethod(parent, 'reverse')) {
                    return;
                }

                const reversed = REPLACEMENTS[node.callee.property.name];

                context.report({
                    node: node.callee.property,
                    loc: {
                        start: parent.callee.property.loc.start,
                        end: node.callee.property.loc.end
                    },
                    message: `Prefer using ${reversed} over reversing the array and ${node.callee.property.name}`,
                    fix(fixer) {
                        return fixer.replaceTextRange([
                            parent.callee.property.start,
                            node.callee.property.end
                        ], reversed);
                    }
                });
            }
        };
    }
};

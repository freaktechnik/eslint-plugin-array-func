/**
 * @author Martin Giger
 * @license MIT
 */
"use strict";

const { isMethod } = require("../lib/helpers/call-expression"),

    REPLACEMENTS = {
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
            'CallExpression[callee.type="MemberExpression"] > MemberExpression > CallExpression[callee.property.name="reverse"]'(node) {
                const parent = node;
                node = parent.parent.parent;
                if(Object.keys(REPLACEMENTS).every((m) => !isMethod(node, m))) {
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
                        if(reversed === "lastIndexOf" || reversed === "indexOf") {
                            return [
                                fixer.insertTextBefore(parent.callee, `${parent.callee.object.name}.length - 1 - `),
                                fixer.replaceTextRange([
                                    parent.callee.property.start,
                                    node.callee.property.end
                                ], reversed)
                            ];
                        }
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

/**
 * @author Martin Giger
 * @license MIT
 */
"use strict";

module.exports = {
    meta: {
        docs: {
            description: "Prefer using the flatMap over an immediate .map() call after a .flat().",
            recommended: true
        },
        fixable: "code",
        schema: []
    },
    create(context) {
        return {
            'CallExpression[callee.type="MemberExpression"] > MemberExpression[property.name="map"] > CallExpression[callee.type="MemberExpression"][callee.property.name="flat"]'(node) {
                const parent = node,
                    callee = node.parent;
                node = callee.parent;

                context.report({
                    node: callee.property,
                    loc: {
                        start: parent.callee.property.loc.start,
                        end: callee.loc.end
                    },
                    message: "Use flatMap instead of .flat().map()",
                    fix(fixer) {
                        return fixer.replaceTextRange([
                            parent.callee.property.start,
                            node.callee.property.end
                        ], 'flatMap');
                    }
                });
            }
        };
    }
};

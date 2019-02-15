/**
 * @author Martin Giger
 * @license MIT
 */
"use strict";

module.exports = {
    meta: {
        docs: {
            description: "Prefer using the flatMap over an immediate .flat() call after a .map().",
            recommended: true
        },
        fixable: "code",
        schema: [],
        type: "suggestion"
    },
    create(context) {
        return {
            'CallExpression[callee.type="MemberExpression"] > MemberExpression[property.name="flat"] > CallExpression[callee.type="MemberExpression"][callee.property.name="map"]'(node) {
                const parent = node,
                    callee = node.parent;
                node = callee.parent;

                context.report({
                    node: callee.property,
                    loc: {
                        start: parent.callee.property.loc.start,
                        end: callee.loc.end
                    },
                    message: "Use flatMap instead of .map().flat()",
                    fix(fixer) {
                        return [
                            fixer.replaceTextRange([
                                parent.callee.property.start,
                                parent.callee.property.end
                            ], 'flatMap'),
                            fixer.removeRange([
                                callee.object.end,
                                callee.parent.end
                            ])
                        ];
                    }
                });
            }
        };
    }
};

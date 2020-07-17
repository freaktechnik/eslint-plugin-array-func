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
            'CallExpression[callee.type="MemberExpression"]:matches([arguments.length=0],[arguments.0.type="Literal"][arguments.0.value=1]) > MemberExpression[property.name="flat"] > CallExpression[callee.type="MemberExpression"][callee.property.name="map"]'(node) {
                const callee = node.parent.parent;

                context.report({
                    node: callee.property,
                    loc: {
                        start: node.callee.property.loc.start,
                        end: callee.loc.end
                    },
                    message: "Use flatMap instead of .map().flat()",
                    fix(fixer) {
                        const [
                                , endOfMap
                            ] = node.range,
                            [
                                , endOfFlat
                            ] = callee.range;
                        return [
                            fixer.replaceTextRange(node.callee.property.range, 'flatMap'),
                            fixer.removeRange([
                                endOfMap,
                                endOfFlat
                            ])
                        ];
                    }
                });
            }
        };
    }
};

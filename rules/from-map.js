/**
 * @author Martin Giger
 * @license MIT
 */
"use strict";

module.exports = {
    meta: {
        docs: {
            description: "Prefer using the mapFn callback of Array.from over an immediate .map() call.",
            recommended: true
        },
        fixable: "code",
        schema: []
    },
    create(context) {
        return {
            "CallExpression:exit"(node) {
                if(!node.callee || node.callee.type !== "MemberExpression" || node.callee.property.name !== "map") {
                    return;
                }
                const { callee } = node,
                    { object: parent } = callee;

                if(!parent.callee || parent.callee.type !== "MemberExpression" || parent.callee.property.name !== "from" || !parent.callee.object || parent.callee.object.type !== "Identifier" || parent.callee.object.name !== "Array") {
                    return;
                }

                context.report({
                    node: callee.property,
                    loc: {
                        start: parent.callee.loc.start,
                        end: callee.loc.end
                    },
                    message: "Use mapFn callback of Array.from instead of map()",
                    fix() {
                        //TODO move map arguments to from. If from already has a map callback combine them?
                    }
                });
            }
        };
    }
};

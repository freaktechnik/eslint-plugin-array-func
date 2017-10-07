/**
 * @author Martin Giger
 * @license MIT
 */
"use strict";

module.exports = {
    create(context) {
        return {
            "CallExpression:exit"(node) {
                if (!node.callee || node.callee.type !== "MemberExpression" || node.callee.property.name !== "map") {
                    return;
                }
                const callee = node.callee,
                    parent = callee.object;

                if(!parent.callee || parent.callee.type !== "MemberExpression" || parent.callee.property.name !== "from" || !parent.callee.object || parent.callee.object.type !== "Identifier" || parent.callee.object.name !== "Array")  {
                    return;
                }

                context.report({
                    node: callee.property,
                    loc: {
                        start: parent.callee.loc.start,
                        end: callee.loc.end
                    },
                    message: "Use mapFn callback of Array.from instead of map()",
                    fix(fixer) {
                        //TODO move map arguments to from. If from already has a map callback combine them?
                    }
                })
            }
        };
    }
};

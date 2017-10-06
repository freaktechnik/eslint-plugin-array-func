/**
 * @author Martin Giger
 * @license MIT
 */
"use strict";

module.exports = (context) => {
    return {
        "CallExpression:exit"(node) {
            if (!node.callee || node.callee.type !== "MemberExpression" || node.callee.toString() !== "map") {
                return;
            }
            const callee = node.callee,
                parent = callee.object;

            if(!parent.callee || parent.callee.type !== "MemberExpression" || parent.callee.toString() !== "from" || !parent.object || parent.object.type !== "Identifier" || parent.object.toString() !== "Array")  {
                return;
            }

            context.report({
                node: callee.property,
                loc: {
                    start: parent.callee.loc.start,
                    end: calle.loc.end
                },
                message: "Use mapFn callback of Array.from instead",
                fix(fixer) {
                    //TODO move map arguments to from. If from already has a map callback combine them?
                }
            })
        }
    };
};

//TODO formatter for from-map. That should be easily auto-fixable.

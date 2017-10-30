/**
 * @author Martin Giger
 * @license MIT
 */
"use strict";

const {
    isMethod,
    getParent,
    isOnObject
} = require("../lib/helpers/call-expression");
const { ARROW_FUNCTION_EXPRESSION } = require("../lib/type");

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
                if(!isMethod(node, "map")) {
                    return;
                }
                const { callee } = node,
                    parent = getParent(node);

                if(!isMethod(parent, "from") || !isOnObject(parent, "Array")) {
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
                        const HAS_CBK = 2,
                            PARAM_SEPARATOR = ", ",
                            FUNCTION_END = ")",
                            sourceCode = context.getSourceCode();

                        // Merge the from and map callbacks
                        if(parent.arguments.length >= HAS_CBK) {
                            const OMIT_ITEM = 1,
                                [
                                    mapCallback,
                                    mapThisArg
                                ] = node.arguments,
                                [
                                    _, // eslint-disable-line no-unused-vars
                                    callback,
                                    thisArg
                                ] = parent.arguments,
                                // Get the params names from the callback that has the most params (since the signature is identical).
                                params = callback.params.length > mapCallback.params.length ? callback.params : mapCallback.params,
                                paramString = params.map((p) => p.name).join(PARAM_SEPARATOR),
                                getCallback = (cbk, targ, ps) => {
                                    const source = `(${sourceCode.getText(cbk)})`;
                                    if(targ && cbk.type !== ARROW_FUNCTION_EXPRESSION) {
                                        return `${source}.call(${targ.name}${PARAM_SEPARATOR}${ps})`;
                                    }
                                    return `${source}(${ps})`;
                                },
                                firstCallback = getCallback(callback, { name: 'this' }, paramString);

                            // Try to use an arrow function for the wrapping function, fall back to a function expression if a this is specified.
                            let functionStart = `(${paramString}) => `,
                                functionEnd = "",
                                restParamString = '';
                            if(thisArg && callback.type !== ARROW_FUNCTION_EXPRESSION) {
                                functionStart = `function(${paramString}) { return `;
                                functionEnd = "; }";
                            }
                            if(params.length > OMIT_ITEM) {
                                const restParams = params
                                    .slice(OMIT_ITEM)
                                    .map((p) => p.name);
                                restParamString = PARAM_SEPARATOR + restParams.join(PARAM_SEPARATOR);
                            }
                            // The original map callback from Array.from gets nested as a parameter to the callback from map.
                            const lastCallback = getCallback(mapCallback, mapThisArg, `${firstCallback}${restParamString}`),
                                restParams = sourceCode.getText().substring(callback.end, parent.end);
                            return fixer.replaceTextRange([
                                callback.start,
                                node.end
                            ], `${functionStart}${lastCallback}${functionEnd}${restParams}`);
                        }

                        // Move the map arguments to from.
                        const [ firstArgument ] = node.arguments;
                        return fixer.replaceTextRange([
                            parent.end - FUNCTION_END.length,
                            firstArgument.start
                        ], PARAM_SEPARATOR);
                    }
                });
            }
        };
    }
};

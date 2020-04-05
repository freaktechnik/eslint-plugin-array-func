/**
 * @author Martin Giger
 * @license MIT
 */
"use strict";

const { ARROW_FUNCTION_EXPRESSION } = require("../lib/type");

module.exports = {
    meta: {
        docs: {
            description: "Prefer using the mapFn callback of Array.from over an immediate .map() call.",
            recommended: true
        },
        fixable: "code",
        type: "suggestion",
        schema: []
    },
    create(context) {
        return {
            'CallExpression[callee.type="MemberExpression"] > MemberExpression[property.name="map"] > CallExpression[callee.type="MemberExpression"][callee.property.name="from"][callee.object.type="Identifier"][callee.object.name="Array"]'(node) {
                const parent = node,
                    callee = node.parent;
                node = callee.parent;

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
                                    mapThisArgument
                                ] = node.arguments,
                                [
                                    _, // eslint-disable-line no-unused-vars
                                    callback,
                                    thisArgument
                                ] = parent.arguments,
                                // Get the params names from the callback that has the most params (since the signature is identical).
                                parameters = callback.params.length > mapCallback.params.length ? callback.params : mapCallback.params,
                                parameterString = parameters.map((p) => p.name).join(PARAM_SEPARATOR),
                                getCallback = (cbk, targ, ps) => {
                                    const source = `(${sourceCode.getText(cbk)})`;
                                    if(targ && cbk.type !== ARROW_FUNCTION_EXPRESSION) {
                                        return `${source}.call(${targ.name}${PARAM_SEPARATOR}${ps})`;
                                    }
                                    return `${source}(${ps})`;
                                },
                                firstCallback = getCallback(callback, { name: 'this' }, parameterString);

                            // Try to use an arrow function for the wrapping function, fall back to a function expression if a this is specified.
                            let functionStart = `(${parameterString}) => `,
                                functionEnd = "",
                                restParameterString = '';
                            if(thisArgument && callback.type !== ARROW_FUNCTION_EXPRESSION) {
                                functionStart = `function(${parameterString}) { return `;
                                functionEnd = "; }";
                            }
                            if(parameters.length > OMIT_ITEM) {
                                const restParameters_ = parameters
                                    .slice(OMIT_ITEM)
                                    .map((p) => p.name);
                                restParameterString = PARAM_SEPARATOR + restParameters_.join(PARAM_SEPARATOR);
                            }
                            // The original map callback from Array.from gets nested as a parameter to the callback from map.
                            const lastCallback = getCallback(mapCallback, mapThisArgument, `${firstCallback}${restParameterString}`),
                                [
                                    callbackStartLocation
                                    , callbackEndLocation
                                ] = callback.range,
                                [
                                    , parentEndLocation
                                ] = parent.range,
                                [
                                    , nodeEndLocation
                                ] = node.range,
                                restParameters = sourceCode.getText().slice(callbackEndLocation, parentEndLocation);
                            return fixer.replaceTextRange([
                                callbackStartLocation,
                                nodeEndLocation
                            ], `${functionStart}${lastCallback}${functionEnd}${restParameters}`);
                        }

                        // Move the map arguments to from.
                        const [ firstArgument ] = node.arguments,
                            [ argumentStartLocation ] = firstArgument.range,
                            [
                                , parentEndLocation
                            ] = parent.range;
                        return fixer.replaceTextRange([
                            parentEndLocation - FUNCTION_END.length,
                            argumentStartLocation
                        ], PARAM_SEPARATOR);
                    }
                });
            }
        };
    }
};

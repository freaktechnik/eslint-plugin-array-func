/**
 * @author Martin Giger
 * @license MIT
 */
"use strict";

const arrayFunctions = {
        from: 3
    },
    // All have param location 2
    methods = [
        'map',
        'forEach',
        'filter',
        'find',
        'findIndex',
        'some',
        'every'
    ],
    METHOD_ARG = 2,
    POS_TO_ARRAY = 1,
    FUNC_POS = -2,
    checkFunction = (node, functionName, argumentPosition) => !node.callee || node.callee.type !== "MemberExpression" || node.callee.property.name !== functionName || node.arguments.length < argumentPosition || node.arguments[argumentPosition + FUNC_POS].type !== "ArrowFunctionExpression",
    checkArrayFunction = (functionName, paramPosition, node, context) => {
        if(checkFunction(node, functionName, paramPosition) || node.callee.object.name !== "Array") {
            return;
        }
        const argument = node.arguments[paramPosition - POS_TO_ARRAY];
        context.report({
            node: argument,
            loc: argument.loc,
            message: "Unnecessary this argument '{{ argument }}' with arrow function as callback to Array.{{ name }}",
            data: {
                name: node.callee.property.name,
                argument: argument.name
            }
        });
    },
    checkMemberFunction = (functionName, node, context) => {
        //TODO somehow check if the call is on an array?
        if(checkFunction(node, functionName, METHOD_ARG)) {
            return;
        }
        const argument = node.arguments[METHOD_ARG - POS_TO_ARRAY];
        context.report({
            node: argument,
            loc: argument.loc,
            message: "Unnecessary this argument '{{ argument }}' with an arrow function as callback to {{ name }}",
            data: {
                name: node.callee.property.name,
                argument: argument.name || argument.value || argument.raw
            }
        });
    };

module.exports = {
    meta: {
        docs: {
            description: "Avoid the this parameter when providing arrow function as callback in array functions.",
            recommended: true
        },
        schema: []
    },
    create(context) {
        return {
            "CallExpression:exit"(node) {
                for(const func in arrayFunctions) {
                    checkArrayFunction(func, arrayFunctions[func], node, context);
                }

                for(const func of methods) {
                    checkMemberFunction(func, node, context);
                }
            }
        };
    }
};

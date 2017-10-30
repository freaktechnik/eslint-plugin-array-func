/**
 * @author Martin Giger
 * @license MIT
 */
"use strict";

const {
    isMethod,
    isOnObject
} = require("../lib/helpers/call-expression");
const { ARROW_FUNCTION_EXPRESSION } = require("../lib/type");

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
    //TODO should also check if the identifier is not an arrow function expression. Similar problem to array detection.
    checkFunction = (node, functionName, argumentPosition) => !isMethod(node, functionName) || node.arguments.length < argumentPosition || node.arguments[argumentPosition + FUNC_POS].type !== ARROW_FUNCTION_EXPRESSION,
    checkArrayFunction = (functionName, paramPosition, node, context) => {
        if(checkFunction(node, functionName, paramPosition) || !isOnObject(node, "Array")) {
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
            },
            fix(fixer) {
                const prevArgumentEnd = node.arguments[paramPosition + FUNC_POS].end;
                return fixer.removeRange([
                    prevArgumentEnd,
                    argument.end
                ]);
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
        schema: [],
        fixable: "code"
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

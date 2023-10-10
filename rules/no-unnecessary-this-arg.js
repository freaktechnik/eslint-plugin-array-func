/**
 * @license MIT
 * @author Martin Giger
 */
import {
    isMethod,
    isOnObject
} from "../lib/helpers/call-expression.js";
import { ARROW_FUNCTION_EXPRESSION } from "../lib/type.js";

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
    checkArrayFunction = (functionName, parameterPosition, node, context) => {
        if(checkFunction(node, functionName, parameterPosition) || !isOnObject(node, "Array")) {
            return;
        }
        const argument = node.arguments[parameterPosition - POS_TO_ARRAY];
        context.report({
            node: argument,
            loc: argument.loc,
            messageId: "unnecessaryThisArgStatic",
            data: {
                name: node.callee.property.name,
                argument: argument.name
            },
            fix(fixer) {
                const [
                        , previousArgumentEnd
                    ] = node.arguments[parameterPosition + FUNC_POS].range,
                    [
                        , argumentEnd
                    ] = argument.range;
                return fixer.removeRange([
                    previousArgumentEnd,
                    argumentEnd
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
            messageId: "unnecessaryThisArgMethod",
            data: {
                name: node.callee.property.name,
                argument: argument.name || argument.value || argument.raw
            }
        });
    };

export default {
    meta: {
        docs: {
            description: "Avoid the this parameter when providing arrow function as callback in array functions.",
            recommended: true
        },
        schema: [],
        fixable: "code",
        type: "suggestion",
        messages: {
            unnecessaryThisArgMethod: "Unnecessary this argument '{{ argument }}' with an arrow function as callback to {{ name }}",
            unnecessaryThisArgStatic: "Unnecessary this argument '{{ argument }}' with arrow function as callback to Array.{{ name }}"
        }
    },
    create(context) {
        return {
            "CallExpression:exit"(node) {
                for(const functionName in arrayFunctions) {
                    checkArrayFunction(functionName, arrayFunctions[functionName], node, context);
                }

                for(const functionName of methods) {
                    checkMemberFunction(functionName, node, context);
                }
            }
        };
    }
};

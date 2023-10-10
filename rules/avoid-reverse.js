/**
 * @license MIT
 * @author Martin Giger
 */
import { isMethod } from "../lib/helpers/call-expression.js";

const REPLACEMENTS = {
    reduce: "reduceRight",
    reduceRight: "reduce"
};

export default {
    meta: {
        docs: {
            description: "Prefer methods operating from the right over reversing the array",
            recommended: true
        },
        schema: [],
        fixable: "code",
        type: "suggestion",
        messages: {
            avoidReverse: "Prefer using {{ reversed }} over reversing the array and {{ methodName }}"
        }
    },
    create(context) {
        return {
            'CallExpression[callee.type="MemberExpression"] > MemberExpression > CallExpression[callee.property.name="reverse"]'(node) {
                const parent = node;
                node = parent.parent.parent;
                if(Object.keys(REPLACEMENTS).every((m) => !isMethod(node, m))) {
                    return;
                }
                const reversed = REPLACEMENTS[node.callee.property.name];

                context.report({
                    node: node.callee.property,
                    loc: {
                        start: parent.callee.property.loc.start,
                        end: node.callee.property.loc.end
                    },
                    messageId: "avoidReverse",
                    data: {
                        reversed,
                        methodName: node.callee.property.name
                    },
                    fix(fixer) {
                        const [ propertyStart ] = parent.callee.property.range,
                            [
                                , propertyEnd
                            ] = node.callee.property.range;
                        return fixer.replaceTextRange([
                            propertyStart,
                            propertyEnd
                        ], reversed);
                    }
                });
            }
        };
    }
};

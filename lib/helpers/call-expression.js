/**
 * @author Martin Giger
 * @license MIT
 */
import {
    MEMBER_EXPRESSION,
    IDENTIFIER
} from "../type.js";

// Helper functions for call expression nodes.

export const isMethod = (node, name) => "callee" in node && node.callee.type === MEMBER_EXPRESSION && node.callee.property.name === name;

export const isOnObject = (node, name) => "object" in node.callee && node.callee.object.type === IDENTIFIER && node.callee.object.name === name;

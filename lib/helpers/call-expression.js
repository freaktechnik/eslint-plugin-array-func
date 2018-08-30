/**
 * @author Martin Giger
 * @license MIT
 */
"use strict";

const {
    MEMBER_EXPRESSION,
    IDENTIFIER
} = require("../type");

// Helper functions for call expression nodes.

exports.isMethod = (node, name) => "callee" in node && node.callee.type === MEMBER_EXPRESSION && node.callee.property.name === name;

exports.isOnObject = (node, name) => "object" in node.callee && node.callee.object.type === IDENTIFIER && node.callee.object.name === name;

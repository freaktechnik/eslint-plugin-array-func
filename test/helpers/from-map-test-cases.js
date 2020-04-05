module.exports = {
    valid: [
        'array.map((t) => t.id)',
        'Array.from(iterable).some((t) => t !== "a")',
        'Array.from(iterable, (t) => t.id)'
    ],
    invalid: [
        {
            code: 'Array.from(iterable).map((t) => t.id)',
            errors: [ {
                message: 'Use mapFn callback of Array.from instead of map()',
                column: 1,
                line: 1
            } ],
            output: 'Array.from(iterable, (t) => t.id)'
        },
        {
            code: 'Array.from(iterable, (t) => t.id, a).map((t) => t[0], b)',
            errors: [ {
                message: 'Use mapFn callback of Array.from instead of map()',
                column: 1,
                line: 1
            } ],
            output: 'Array.from(iterable, (t) => ((t) => t[0])(((t) => t.id)(t)), a)'
        },
        {
            code: 'Array.from(iterable, function(t) { return t.id; }, a).map((t) => t[0])',
            errors: [ {
                message: 'Use mapFn callback of Array.from instead of map()',
                column: 1,
                line: 1
            } ],
            output: 'Array.from(iterable, function(t) { return ((t) => t[0])((function(t) { return t.id; }).call(this, t)); }, a)'
        },
        {
            code: 'Array.from(iterable, function(t) { return t.id; }, a).map(function(t) { return t[0]; }, b)',
            errors: [ {
                message: 'Use mapFn callback of Array.from instead of map()',
                column: 1,
                line: 1
            } ],
            output: 'Array.from(iterable, function(t) { return (function(t) { return t[0]; }).call(b, (function(t) { return t.id; }).call(this, t)); }, a)'
        },
        {
            code: 'Array.from(iterable, function(u) { return u.id; }, a).map(function(t, i) { return t[0]; }, b)',
            errors: [ {
                message: 'Use mapFn callback of Array.from instead of map()',
                column: 1,
                line: 1
            } ],
            output: 'Array.from(iterable, function(t, i) { return (function(t, i) { return t[0]; }).call(b, (function(u) { return u.id; }).call(this, t, i), i); }, a)'
        },
        {
            code: 'Array.from(iterable, function(u, i) { return u.id; }, a).map(function(t) { return t[0]; }, b)',
            errors: [ {
                message: 'Use mapFn callback of Array.from instead of map()',
                column: 1,
                line: 1
            } ],
            output: 'Array.from(iterable, function(u, i) { return (function(t) { return t[0]; }).call(b, (function(u, i) { return u.id; }).call(this, u, i), i); }, a)'
        }
    ]
};

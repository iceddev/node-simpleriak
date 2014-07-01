var extend = require('util')._extend;

exports.parseJson = function (input) {
    var result;

    try {
        result = JSON.parse(input);
    } catch (e) {
        result = e;
    }

    return result;
};

exports.paramsWithDefaults = function (params, defaults) {
    var result = extend({}, defaults);

    // similar to util._extend but plucking out key and bucket
    var keys = Object.keys(params);
    var i = keys.length;

    while (i--) {
        var key = keys[i];
        if (result[key] !== 'key' && result[key] !== 'bucket') {
            result[key] = params[key];
        }
    }

    return result;
};

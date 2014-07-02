var _ = require('lodash');

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
    var extraParams = _.omit(params, 'bucket', 'key');

    var result = _.merge({}, defaults, extraParams);

    return result;
};

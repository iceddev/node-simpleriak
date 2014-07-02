var utils = require('./lib/utils');
var backends = require('./lib/backends');

function SimpleRiak(options) {
    options = options || {};
    this.defaults = {
        content: {}
    };
    this.server = {};

    if (options.bucket) {
        this.defaults.bucket = options.bucket;
    }

    if (options.content_type) {
        this.defaults.content.content_type = options.content_type;
    }

    this.server.host = options.host || '127.0.0.1';
    this.server.port = options.port; // we let this fall through undefined so the backend can determine its own default

    this.backend = new backends[options.backend || 'http'](this.server);
}

SimpleRiak.prototype.getBuckets = function (callback) {
    this.backend.getBuckets(callback);
};

SimpleRiak.prototype.getBucket = function (params, callback) {
    if (typeof params === 'function') {
        callback = params;
        params = {};
    }

    var bucket = params.bucket || this.defaults.bucket;

    if (!bucket) {
        return callback(new Error('No bucket specified'));
    }

    this.backend.getBucket(bucket, callback);
};

SimpleRiak.prototype.setBucket = function (params, callback) {
    var bucket = params.bucket || this.defaults.bucket;
    delete params.bucket;

    if (!bucket) {
        return callback(new Error('No bucket specified'));
    }

    this.backend.setBucket(bucket, params, callback);
};

SimpleRiak.prototype.getKeys = function (params, callback) {
    if (typeof params === 'function') {
        callback = params;
        params = {};
    }

    var bucket = params.bucket || this.defaults.bucket;
    delete params.bucket;

    if (!bucket) {
        return callback(new Error('No bucket specified'));
    }

    this.backend.getKeys(bucket, callback);
};

SimpleRiak.prototype.get = function (params, callback) {
    var bucket = params.bucket || this.defaults.bucket;
    var key = params.key;
    var paramsWithDefaults = utils.paramsWithDefaults(params, this.defaults);

    if (!bucket) {
        return callback(new Error('No bucket specified'));
    }

    this.backend.get(bucket, key, paramsWithDefaults, callback);
};

SimpleRiak.prototype.put = function (params, callback) {
    var bucket = params.bucket || this.defaults.bucket;
    var key = params.key;
    var paramsWithDefaults = utils.paramsWithDefaults(params, this.defaults);

    if (!bucket) {
        return callback(new Error('No bucket specified'));
    }

    this.backend.put(bucket, key, paramsWithDefaults, callback);
};

SimpleRiak.prototype.delete = function (params, callback) {
    var bucket = params.bucket || this.defaults.bucket;
    var key = params.key;
    var paramsWithDefaults = utils.paramsWithDefaults(params, this.defaults);

    if (!bucket) {
        return callback(new Error('No bucket specified'));
    }

    this.backend.delete(bucket, key, paramsWithDefaults, callback);
};

SimpleRiak.prototype.ping = function (callback) {
    this.backend.ping(callback);
};

SimpleRiak.prototype.status = function (callback) {
    this.backend.status(callback);
};

SimpleRiak.prototype.resources = function (callback) {
    this.backend.resources(callback);
};

exports.createClient = function (options) {
    return new SimpleRiak(options);
};

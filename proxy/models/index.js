var config = require('../../config').config;
var mongoose = require('mongoose');

mongoose.connect(config.db, function (err) {
    if (err) {
        console.error('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
});

require('./response');
require('./topic');
require('./pattern');

exports.Topic = mongoose.model('Topic');
exports.Response = mongoose.model('Response');
exports.Pattern = mongoose.model('Pattern');

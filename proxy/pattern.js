var models = require('./models');
var Method = models.Pattern;

exports.getMethodByName = function (name, callback) {
    if (name.length === 0) {
        return callback(null, []);
    }
    Method.find({ name: { $in: name} }, callback);
};

exports.getMethodByHash = function (simhash, callback) {
    Method.findOne({ 'simhash': simhash }, callback);
};

exports.newAndSave = function (simhash, content, response_list, hotpoint, callback) {
    var method = new Pattern();
    method.simhash = simhash;
    method.response_list = response_list;
    method.content = content;
    method.hotpoint = hotpoint;
    method.save(callback);
};

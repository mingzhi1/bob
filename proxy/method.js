var models = require('./models');
var Method = models.Method;

exports.getMethodByName = function (name, callback) {
    if (name.length === 0) {
        return callback(null, []);
    }
    Method.find({ name: { $in: name} }, callback);
};

exports.getMethodByID = function (id, callback) {
    Method.findOne({ 'method': id }, callback);
};

exports.newAndSave = function (name, id, content, callback) {
    var method = new Method();
    method.name = name;
    method.id = id;
    method.content = content;
    method.save(callback);
};

var _ = require('underscore');
var mustache = require('mustache');
var parser = require('./parser');

var Engine = (function () {

    function Engine(topics, botData) {
        var _this = this;
        this.topics = topics;
        if (!this.topics) {
            //throw "Topics not found";
        }
        this.view = {
            topic: null,
            bot: botData,
            set: function(name, value) {
                return _this.view[name] = value;
            },
            get: function(name) {
                return _this.view[name] || '';
            }
        };
        _.each(this.topics, function(topic) {
            return _.each(topic.categories, function(category) {
                return category["room:" + roomName] =
                    new RegExp(category.pattern.replace('*', '([^/?!.;:$]*)'), "i");
            });
        });
    };

    Engine.prototype.getCurrentTopic = function() {
        var _this = this;
        return _.find(this.topics, function(topic) {
            return topic.name === _this.view.topic;
        });
    };

    Engine.prototype.findCategory = function(message) {
        var topic,
            _this = this;
        topic = this.getCurrentTopic();
        if (!topic) {
            return this.view.topic = null;
        }
        return _.find(topic.categories, function(category) {
            return category["room:" + roomName].test(message);
        });
    };
    
    Engine.prototype.reply = function(authorData, message, cb) {
        var category, match, responce, _ref;
        category = this.findCategory(message);
        if (!category) {
            return cb(null);
        }
        if ((_ref = category.template) != null ? _ref.link : void 0) {
            return this.reply(authorData, category.template.link, cb);
        }
        match = category["room:" + roomName].exec(message);
        if (match && match.length > 0) {
            this.view.star = match[1];
        }
        if (category.template["do"]) {
            category.template["do"](this.view, this.view.star);
        }
        responce = mustache.render(category.template.text, this.view);
        return cb(null, responce);
    };

    return Engine;

})();

module.exports = Engine;

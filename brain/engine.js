var AiEngine;
var _ = require('underscore');
var mustache = require('mustache');

AiEngine = (function() {

    function AiEngine(roomName, topics, botData) {
        var _this = this;
        this.roomName = roomName;
        this.topics = topics;
        if (!this.topics) {
            throw "Topics not found";
        }
        if (!this.roomName) {
            throw "Room name is undefined not found";
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
                return category["room:" + _this.roomName] =
                    new RegExp(category.pattern.replace('*', '([^/?!.;:$]*)'), "i");
            });
        });
    };

    AiEngine.prototype.getCurrentTopic = function() {
        var _this = this;
        return _.find(this.topics, function(topic) {
            return topic.name === _this.view.topic;
        });
    };

    AiEngine.prototype.findCategory = function(message) {
        var topic,
            _this = this;
        topic = this.getCurrentTopic();
        if (!topic) {
            return this.view.topic = null;
        }
        return _.find(topic.categories, function(category) {
            return category["room:" + _this.roomName].test(message);
        });
    };

    AiEngine.prototype.reply = function(authorData, message, cb) {
        var category, match, responce, _ref;
        category = this.findCategory(message);
        if (!category) {
            return cb(null);
        }
        if ((_ref = category.template) != null ? _ref.link : void 0) {
            return this.reply(authorData, category.template.link, cb);
        }
        match = category["room:" + this.roomName].exec(message);
        if (match && match.length > 0) {
            this.view.star = match[1];
        }
        if (category.template["do"]) {
            category.template["do"](this.view, this.view.star);
        }
        responce = mustache.render(category.template.text, this.view);
        return cb(null, responce);
    };

    return AiEngine;

})();

module.exports = AiEngine;

//the brain of bob

var engine = require('./engine');
var graphmaster = require('./graphmaster');
var learing = require('./learing');
var graphmaster = require('./graphmaster');

var Brain = (function (){

	function Brain(msg) {
		var _this = this;
		this.msg = msg;

	};

	Brain.prototype.getResponse = function(msg) {
		// body...
	};

	Brain.prototype.setInfo = function(info) {
		// body..
	};

	Brain.prototype.getInfo = function(info){
		// body..
	};

})();

module.exports = Brain;

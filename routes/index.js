var brain = require('../brain');
var url = require('url');
var querystring = require('querystring');

exports.index = function(req, res){
    res.render('index', { title: 'DrawNote' });
};

exports.said = function(req, res){
    var theUrl = url.parse(req.url);

    var content = querystring.parse(theUrl.query);
    var obj = content.msg;

    res.writeHead(200, {'Content-Type': 'text/json'});
    var response = brain(obj);
    res.end(JSON.stringify({ result: '100', response:obj}));
};

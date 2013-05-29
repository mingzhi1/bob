var express = require('express')
    , routes = require('./routes')
    , http = require('http')
    , path = require('path');
var config = require('./config/config');
var app = express();
var MemStore = express.session.MemoryStore;

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.compress());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser(config.cookie_secret));
    app.use(express.session({
        secret: config.session_secret,
        store: MemStore({
            reapInterval: 60000 * 10
        })
    }));
    app.use(express.static(path.join(__dirname, 'public')));
});

app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
});

app.use(app.router);

app.configure('development', function(){
    app.use(express.errorHandler());
});

routes(app);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});


module.exports = app;
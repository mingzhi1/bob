var main = require('./routes/index');

module.exports = function(app)
{
    app.get('/',main.index);
    app.get('/said',main.said);
};
var nodegrass = require('nodegrass');

function weather() {
    //http.createClient(80, "http://api.liqwei.com/weather/");
    nodegrass.get("http://api.liqwei.com/weather/",function(content,status,headers){
     var data = content;
     },'utf8').on('error', function(e) {
        console.log("Got error: " + e.message);
    });
    return "";
}
function weather(city) {
    return "http://api.liqwei.com/weather/?city="
}
module.exports = function (city) {
    return weather(city);
}
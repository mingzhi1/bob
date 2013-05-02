var app = require('../app');

describe('app.js', function () {

  before(function (done) {
    app.listen(0, done);
  });
  after(function () {
    app.close();
  });

  console.log('start');

});
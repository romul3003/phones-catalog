var express = require('express');
var app = express();

app.use(express.static(__dirname + '/'));

var server = app.listen(3000, function () {

  var port = server.address().port;
  console.log('Your server is running at http://localhost:%s', port);

});

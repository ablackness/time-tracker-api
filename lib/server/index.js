'use strict';

var server = require('./app');

var port = process.env.PORT || 8080;

server.listen(port, function () {
  return console.log('Server is listening on', port);
});
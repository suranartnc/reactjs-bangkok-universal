var config = require('../src/shared/configs');

var jsonServer = require('json-server');
var db = require('./db');

var port = config.apiPort;

var server = jsonServer.create();
var router = jsonServer.router(db());

server.use(jsonServer.defaults());
server.use(router);

server.listen(port);
console.log(`Api server listening on ${config.apiHost}:${port}`);
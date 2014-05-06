/*!
 * This file is part of epm-cli.
 *
 * please see the LICENSE
 */

var fs = require('fs')

module.exports = serve

var cli = require("./cli.js")
  , path = require("path")
  , Epm = require('epm')
  ;

var log = cli.log;

function serve(ops, cb) {
  
  if (typeof ops === "function") {
    cb = ops;
    ops = {};
  }

  dir = ops.path || ".";
  ops.port = ops.port || 3220;

  var server = new Epm.createServer(path.resolve(dir));

  server
  .on('error', function(err){
    log.error(err);
  })
  .on('listen', function(info){
    log.info('server', 'listen at ' + info.url);
  });

  server.listen({ port: 3220});
}
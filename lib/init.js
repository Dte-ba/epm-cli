/*!
 * This file is part of epm-cli.
 *
 * please see the LICENSE
 */

module.exports = init

var cli = require("./cli.js")
  , path = require('path')
  , fs = require('fs')
  , Epm = require('epm')
  ;

var log = cli.log;

function init(ops, cb) {
  
  if (typeof ops === "function") {
    cb = ops;
    ops = {};
  }

  dir = ops.path || ".";
  name = ops.name || "main";

  var repo = new Epm(path.resolve(dir));

  repo.on('error', function(err){
    log.error(err);
  });

  repo.on('init', function(info){
    if (info.created){
      log.info('epm repository created at ' + info.path);
    } else {
      log.info('epm repository reinitialized at ' + info.path);
    }
  });

  repo.init(ops);
  
}

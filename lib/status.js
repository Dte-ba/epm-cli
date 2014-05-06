/*!
 * This file is part of epm-cli.
 *
 * please see the LICENSE
 */

var fs = require('fs')

module.exports = status

var cli = require("./cli.js")
  , path = require("path")
  , Epm = require('epm')
  ;

var log = cli.log;

function status(ops, cb) {
  
  if (typeof ops === "function") {
    cb = ops;
    ops = {};
  }

  dir = ops.path || ".";

  var repo = new Epm(path.resolve(dir));

  repo.on('error', function(err){
    log.error(err);
  })
  .once('ready', function(info){
    console.log(info);
  });

  repo.read(false);
}
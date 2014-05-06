/*!
 * This file is part of epm-cli.
 *
 * please see the LICENSE
 */

module.exports = remote

var cli = require("./cli.js")
  , path = require('path')
  , fs = require('fs')
  , Epm = require('epm')
  ;

var log = cli.log;

var handlers = {
  "add": __add,
  "list": __list,
  "rm": __rm
}

function remote(cmd, ops, cb) {
  
  if (typeof ops === "function") {
    cb = ops
    ops = {}
  }

  // check the command
  if (!(/^(add|rm|list)$/g).test(cmd)) {
    return cb && cb(new Error("Unknown command ", cmd))
  }

  dir = ops.path || ".";
  var repo = new Epm(path.resolve(dir));

  repo.on('error', function(err){
    log.error(err);
    cb && cb(err)
  });

  return handlers[cmd](repo, ops, cb)
}

function __add(repo, ops, cb) {

  repo.remote.on('added', function(remote){
    log.info("remotes", "added `" + ops.url  + "` as `" + ops.name + "`");
  })

  repo.remote.add(ops);
}

function __list(repo, ops, fn) {

  repo.remote.list(ops, function(err, remotes){
    if (err) return fn && fn(err)

    var names = Object.keys(remotes)

    names.forEach(function(rn){
      console.log(rn);
    })
  })

}

function __rm(ops, fn) {

  repo.remote.remove(ops.name, function(err, remotes){
    if (err) return fn && fn(err);
    
    log.info("remotes", "removed `" + ops.name + "`");
  }):

}
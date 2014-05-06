/*!
 * This file is part of epm-cli.
 *
 * please see the LICENSE
 */

module.exports = pull

var cli = require("./cli.js")

var log = cli.log

function pull(ops, cb) {
  
  if (typeof ops === "function") {
    cb = ops
  }

  if (ops.remote === undefined) return cb && cb(new Error('Unknown remote'));

	dir = ops.path || ".";

  var repo = new Epm(path.resolve(dir));

  repo.pull(ops.remote)
    .on('error', function(err){
      log.error(err);
    })
    .on('status', function(msg){
      log.log(msg);
    })
    .on('download.progress', function(info){
      // do somwthing
      console.log(info);
    })
    .on('complete', function(data){
      log.log('pull', 'complete ' + ops.remote)
    })
    .retrieve();

}

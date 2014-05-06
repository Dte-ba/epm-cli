/*!
 * This file is part of epm-cli.
 *
 * please see the LICENSE
 */

module.exports = fetch

var cli = require("./cli.js")
var log = cli.log
  
function fetch(ops, cb) {
  
  if (typeof ops === "function") {
    cb = ops
  }

  dir = ops.path || ".";

  if (ops.remote === undefined) return cb && cb(new Error('Unknown remote'));
  
  var repo = new Epm(path.resolve(dir));

  repo.fetch(ops.remote)
    .on('error', function(err){
      log.error(err);
    })
    .on('status', function(msg){
      log.log(msg);
    })
    .on('complete', function(data){
      log.log('fetch', 'complete ' + ops.remote)
    })
    .retrieve();
}

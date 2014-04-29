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

  var dir = ops.path || "."
  var repo = new epm.EpmRepo(dir, ops)

  repo.fetch(ops, function(err, data){
    if (err) return cb && cb(err)

    log.info('fetch', '`' + ops.remote + '` fetched')

    return cb && cb(null)
  })
 
}

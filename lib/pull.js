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

  if (ops.remote === undefined) return cb && cb(new Error('Unknown remote'))

	var dir = ops.path || "."
  var repo = new epm.EpmRepo(dir, ops)

  repo.pull(ops, function(err, data){
    if (err) return cb && cb(err)

    return cb && cb(null)
  })

}

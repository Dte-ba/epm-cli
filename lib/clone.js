/*!
 * This file is part of epm-cli.
 *
 * please see the LICENSE
 */

module.exports = clone

var cli = require("./cli.js")
var log = cli.log

function clone(ops, cb) {
  
  if (typeof ops === "function") {
    cb = ops
  }

  ops = ops || "."

  return cb && cb(null, "TODO: clone")
}
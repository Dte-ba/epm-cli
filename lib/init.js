/*!
 * This file is part of epm-cli.
 *
 * please see the LICENSE
 */

module.exports = init

var cli = require("./cli.js")
  , path = require('path')
  , fs = require('fs')

var log = cli.log

function init(ops, cb) {
  
  if (typeof ops === "function") {
    cb = ops
    ops = {}
  }

  dir = ops.path || "."
  name = ops.name || "main"

  var repo = new epm.EpmRepo(dir, ops)
  var fulldir = repo.path
  var re = fs.existsSync(fulldir)

  log.pause()

  repo.init(function(err){
    log.resume()
    if (err) return cb && cb(err)
    var action = re ? "reinitialized" : "created"
    log.info('init', 'repository `' + name + '` ' + action + ' at ' + fulldir)

    cb && cb(null)
  })
  
}

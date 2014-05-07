/*!
 * This file is part of epm-cli.
 *
 * please see the LICENSE
 */

module.exports = pull

var cli = require("./cli.js")
  , path = require('path')
  , Epm = require('epm')
  , formater = require ("./utils/formater.js")
  ;

var log = cli.log

function pull(ops, cb) {
  
  if (typeof ops === "function") {
    cb = ops
  }

  if (ops.remote === undefined) return cb && cb(new Error('Unknown remote'));

	dir = ops.path || ".";

  var repo = new Epm(path.resolve(dir));

  repo.pull
    .remote(ops.remote)
    .on('error', function(err){
      log.error(err);
    })
    .on('status', function(msg){
      log.verbose('status', msg);
    })
    .on('download.progress', function(info){

      process.stdout.cursorTo (0)

        var msj = "Retrieving package: " + formater.cutHash(info.target)
            formater.percentage(info.percentage).trim () +
            " (" + info.currentSize + "/" + info.totalSize + "), " +
            formater.storage (info.currentSize).trim() + " | " +
            formater.speed (info.speed).trim()

        process.stdout.write(msj)
        for (var i = (process.stdout.columns - msj.length - 2); i >= 0; i--) {
          process.stdout.write(' ')
        };

        process.stdout.cursorTo (0);
    })
    .on('complete', function(data){
      log.info('clone', 'complete ' + ops.url)
      console.log('');
      cb && cb(null);
    })
    .retrieve();

}

/*!
 * This file is part of epm-cli.
 *
 * please see the LICENSE
 */

module.exports = clone

var cli = require("./cli.js")
  , Epm = require('epm')
  , mkdirp = require('mkdirp')
  , path = require('path')
  , fs = require('graceful-fs')
  , formater = require ("./utils/formater.js")
  ;

var log = cli.log

function clone(ops, cb) {
  
  if (typeof ops === "function") {
    cb = ops
  }

  if (ops.path === undefined || ops.name == undefined || ops.url === undefined){
    return cb && cb(new Error('Invalid params'));
  }

  ops.path = path.resolve(ops.path);

  var repo = new Epm(ops.path);

    repo.on('error', function(err){
      log.error(err);
      cb && cb(err)
    });

    repo.on('init', function(info){
      if (info.created){
        log.info('epm repository created at ' + info.path);
      } else {
        log.info('epm repository reinitialized at ' + info.path);
      }

      repo.remote.on('added', function(remote){
        log.verbose("remotes", "added `" + ops.url  + "` as `origin`");
        
        log.info('Cloning ...');

        repo.pull
          .remote('origin')
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

      })
      repo.remote.add({ name: 'origin', url: ops.url});

    });

  if (!fs.existsSync(ops.path)){
    mkdirp.sync(ops.path);
  }

  repo.init(ops); 
}
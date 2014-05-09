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
  , util = require('util')
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
    .on('error', function(err, downloader){
      log.error(err);
    })
    .on('status', function(msg){
      log.verbose('status', msg);
    })
    .on('packages.status', function(info){
      var msj = util.format(
          'finded %d package at `%s`, %d to clone %d to update '
        , info.remotes.length
        , ops.remote
        , info.news.length
        , info.olds.length
      );
      log.info('fetch', msj );
    })
    .on('download.start', function(info){
      log.verbose('download', 'start ' + formater.cutHash(info.target))
    })
    .on('download.progress', function(info){

      process.stdout.cursorTo (0)

        var msj = util.format(
            'Retrieving package: %s  %d% (%d/%d), %s | %s'
          , formater.cutHash(info.target)
          , info.progress.percentage
          , info.progress.received
          , info.progress.total
          , formater.storage(info.progress.received).trim()
          , formater.speed(info.progress.speed).trim()
        );

        process.stdout.write(msj)
        for (var i = (process.stdout.columns - msj.length - 2); i >= 0; i--) {
          process.stdout.write(' ')
        };
        process.stdout.cursorTo (0);
    })
    .on('download.complete', function(file, info){

      process.stdout.cursorTo (0);
      for (var i = (process.stdout.columns - 2); i >= 0; i--) {
        process.stdout.write(' ')
      };
      process.stdout.cursorTo (0);

      var msj = util.format(
          'complete %s in %s at %s',
          formater.cutHash(file.target),
          formater.time(info.endtime).trim(),
          formater.speed(info.average).trim()
        );
      log.info('download', msj );
    })
    .on('check', function(info){
      log.verbose('check', 'checking integrity of ' + formater.cutHash(info.target));
    })
    .on('check.complete', function(info){
      log.info('check', formater.cutHash(info.target) + ' integrity OK! ');
    })
    .on('complete', function(remote){
      log.info('pull', 'complete from ' + remote.url);
      cb && cb(null);

    })
    .retrieve();

}

/*!
 * epm-cli
 *
 * Copyright(c) 2014 Dirección de Tecnología Educativa de Buenos Aires (Dte-ba)
 * GPL Plublic License v3
 */

;!function() {

  var EventEmitter = require("events").EventEmitter
    , log = require('./log')
    , cli = module.exports = new EventEmitter
    , fs = require('graceful-fs')

  cli.cliOps = { } // command line options
  cli.commands = { } // cli commands
  cli.version = require("../package.json").version
  cli.log = log
  
  var cmdList = [ "init", "status", "show", "remote", "clone", "fetch", "pull", "serve" ]
    , commandCache = {}

  // set the commands
  cmdList.forEach(function(c){
    
    Object.defineProperty(cli.commands, c, { get : function () {
      if (commandCache[c]) return commandCache[c]

      var cmd = require(__dirname+"/"+c+".js")
      commandCache[c] = function () {
        var args = Array.prototype.slice.call(arguments, 0)

        if (typeof args[args.length - 1] !== "function") {
          args.push(defaultCb)
        }
        if (args.length === 1) args.unshift([])
        preCmd.apply(cli, args)
        cmd.apply(cli, args)
      }

      Object.keys(cmd).forEach(function (k) {
        commandCache[c][k] = cmd[k]
      })

      return commandCache[c]
    }, enumerable: cmdList.indexOf(c) !== -1 })

  })

  function preCmd() {
    if (cli.program.verbose===true) {
      cli.log.level = "verbose"
    }
  }

  function defaultCb (er, data) {
    if (er) log.error(er.stack || er.message)
    else log.warn('default callback called')

    // delete me
    if (data) console.log(data);
  }

  // always
  require("../bin/epm")

}()
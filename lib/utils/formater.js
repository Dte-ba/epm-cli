// extracted from status-bar

var formater = module.exports = {};

var storage = [" B  ", " KiB", " MiB", " GiB", " TiB", " PiB", " EiB", " ZiB",
    " YiB"];
var speeds = ["B/s", "K/s", "M/s", "G/s", "T/s", "P/s", "E/s", "Z/s", "Y/s"];

var space = function (n, max){
  n += "";
  var spaces = max - n.length;
  for (var i=0; i<spaces; i++){
    n = " " + n;
  }
  return n;
};

var unit = function (n, arr, pow, decimals){
  var chars = decimals ? 5 + decimals : 4;
  if (n < pow) return space (n, chars) + arr[0];
  var i = 1;
  while (i < 9){
    n /= pow;
    if (n < pow) return space (n.toFixed (decimals), chars) + arr[i];
    i++;
  }
  return ">=" + pow + arr[7];
};

var zero = function (n){
  return n < 10 ? "0" + n : n;
};

formater.storage = function (b, decimals){
  return unit (Math.floor (b), storage, 1024,
      decimals === undefined ? 1 : decimals);
};

formater.speed = function (bps, decimals){
  return unit (Math.floor (bps), speeds, 1000,
      decimals === undefined ? 1 : decimals);
};

formater.time = function (s){
  if (s === undefined) return "--:--";
  if (s >= 86400) return " > 1d";
  if (s >= 3600) return " > 1h";
  var str;
  var min = Math.floor (s/60);
  var sec = Math.floor (s%60);
  return zero (min) + ":" + zero (sec);
};

formater.percentage = function (n){
  return space (Math.round (n*100) + "%", 4);
};

formater.cutHash = function (uid){
  if (uid === undefined) return 'Unknown';
  return uid.substring(0, 7) + ".." + uid.substring(uid.length-7);
};


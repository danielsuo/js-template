var bulk = require('bulk-require');
var utils = require('./utils.js');

var apif = bulk(__dirname, ['modules/**/*.js']);

apif.hash        = window.location.hash;
apif.href        = window.location.href;
apif.host        = window.location.host;
apif.protocol    = window.location.protocol;
apif.pathname    = window.location.pathname;
apif.querystring = utils.getQueryString(apif.href);

if (apif.hash) {
  var substringIndex = 1;
  if (apif.hash.charAt(0) == '/') {
    substringIndex = 2;
  }
  apif.hash = apif.hash.substring(2);
}

apif.params = utils.parseQueryString(apif.querystring);

console.log(apif);

module.exports = apif;

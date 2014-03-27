var carcass, unsign, validValue;

unsign = require('cookie-signature').unsign;

carcass = require('carcass');

validValue = carcass.Object.validValue;

module.exports = function(options) {
  var secret, unsignCookie;
  validValue(options.secret);
  secret = options.secret;
  return unsignCookie = function(token) {
    var sessionID;
    if (token == null) {
      return;
    }
    token = decodeURIComponent(token);
    if (token.indexOf('s:') === 0) {
      token = token.slice(2);
    }
    sessionID = unsign(token, secret);
    if (sessionID && sessionID !== token) {
      return sessionID;
    } else {
      return null;
    }
  };
};
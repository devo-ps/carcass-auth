var carcass, cookie, debug, validValue;

debug = require('debug')('carcass:middleware:cookieBearer');

cookie = require('cookie');

carcass = require('carcass');

validValue = carcass.object.validValue;

module.exports = function(options) {
  var cookieBearer;
  validValue(options.name);
  return cookieBearer = function(req, res, next) {
    var cookies, name, pairs, parts, token, _name, _ref, _ref1, _ref2, _value;
    if (((_ref = req.headers) != null ? _ref.authorization : void 0) != null) {
      parts = req.headers.authorization.split(' ');
      if (parts.length === 2 && /^Bearer|Token$/i.test(parts[0])) {
        token = parts[1];
      }
    }
    if ((token == null) && (((_ref1 = req.query) != null ? _ref1.access_token : void 0) != null)) {
      token = req.query.access_token;
    }
    name = options.name;
    if (token != null) {
      token = decodeURIComponent(token);
      if (token.indexOf('s:') !== 0) {
        token = 's:' + token;
      }
      if (req.headers.cookie != null) {
        cookies = (_ref2 = req.cookies) != null ? _ref2 : cookie.parse(req.headers.cookie);
        cookies[name] = token;
        pairs = [];
        for (_name in cookies) {
          _value = cookies[_name];
          pairs.push(_name + '=' + encodeURIComponent(_value));
        }
        req.headers.cookie = pairs.join(';');
      }
      if (req.cookies != null) {
        req.cookies[name] = token;
      }
      if ((req.signedCookies != null) && (req.signedCookies[name] != null)) {
        delete req.signedCookies[name];
      }
    }
    return next();
  };
};

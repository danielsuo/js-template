var utils = {};

utils.getQueryString = function(str) {
  var queryIndex = str.indexOf('?');
  if (queryIndex < 0) {
    return '';
  } else {
    return str.substring(queryIndex);
  }
};

utils.parseQueryString = function (str) {
  var qso = {};
  var qs = (str || document.location.search);
  // Check for an empty querystring
  if (qs == "") {
    return qso;
  }
  // Normalize the querystring
  qs = qs.replace(/(^\?)/, '').replace(/;/g, '&');
  while (qs.indexOf("&&") != -1) {
    qs = qs.replace(/&&/g, '&');
  }
  qs = qs.replace(/([\&]+$)/, '');
  // Break the querystring into parts
  qs = qs.split("&");
  // Build the querystring object
  for (var i = 0; i < qs.length; i++) {
    var qi = qs[i].split("=");
    qi = qi.map(function (n) {
      return decodeURIComponent(n)
    });
    if (qso[qi[0]] != undefined) {
      // If a key already exists then make this an object
      if (typeof (qso[qi[0]]) == "string") {
        var temp = qso[qi[0]];
        if (qi[1] == "") {
          qi[1] = null;
        }
        qso[qi[0]] = [];
        qso[qi[0]].push(temp);
        qso[qi[0]].push(qi[1]);
      } else if (typeof (qso[qi[0]]) == "object") {
        if (qi[1] == "") {
          qi[1] = null;
        }
        qso[qi[0]].push(qi[1]);
      }
    } else {
      // If no key exists just set it as a string
      if (qi[1] == "") {
        qi[1] = null;
      }
      qso[qi[0]] = qi[1];
    }
  }
  return qso;
};

module.exports = utils;

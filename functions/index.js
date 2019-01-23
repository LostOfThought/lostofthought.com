'use strict';

const util = require('util');
const functions = require('firebase-functions');
const XMLHttpRequest = require('xhr2');
exports.cors = functions.https.onRequest((req, res) => {
  let url=decodeURIComponent(req.query.url);
  res.setHeader('Access-Control-Allow-Origin', '*');
  if(! /^https?:\/\/(lostofthought.com|myanimelist.net)($|\/)/.test(url)){
    res.status(418);
    res.send("418 - I'm a teapot.\nThat, and you fucked up.\n" + url);
  }
  let xhr = new XMLHttpRequest();
  xhr.open(req.method, decodeURI(req.query.url));
  xhr.onload = () => {
    res.status(xhr.status);
    xhr.getAllResponseHeaders().trim().split(/[\r\n]+/).forEach((line) => {
      let parts = line.split(': ');
      res.setHeader(parts.shift(), parts.join(': '));
    });
    res.send(xhr.responseText);
  };
  //res.send(util.inspect(req.headers, { showHidden: false, depth: 3 }));
  Object.keys(req.headers).forEach((key) => {
    if (! /^(X-AppEngine-.+|x-cloud-trace-context|function-execution-id|x-forwarded-.+)$/i.test(key)){
      xhr.setRequestHeader(key, req.headers[key]);
    }
  });
  xhr.send();
  console.log(req.query.url);
});


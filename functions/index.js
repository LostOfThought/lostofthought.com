'use strict';

const util = require('util');
const functions = require('firebase-functions');
const XMLHttpRequest = require('xhr2');

const admin = require('firebase-admin');
admin.initializeApp();
const firestore = admin.firestore();

exports.cors = functions.https.onRequest((req, res) => {
  let url = decodeURIComponent(req.query.url);
  let curl = url.replace(/\W/g,'_');
  res.setHeader('Access-Control-Allow-Origin', '*');
  if(! /^https?:\/\/(lostofthought.com|myanimelist.net)($|\/)/.test(url)){
    res.status(418);
    res.send("418 - I'm a teapot.\nThat, and you fucked up.\n" + url);
  }
  firestore.collection('cache').doc(curl).get().then((doc) => {
    if(!doc.exists || req.cache === 'false'){
      console.log('Cache miss: ' + url);
      let xhr = new XMLHttpRequest();
      xhr.open(req.method, url);
      xhr.onload = () => {
        res.setHeader('x-lot-cache', 'Miss')
        res.status(xhr.status);
        xhr.getAllResponseHeaders().trim().split(/[\r\n]+/).forEach((line) => {
          let parts = line.split(': ');
          res.setHeader(parts.shift(), parts.join(': '));
        });
        if(xhr.status === 200){
          let obj = {
            headers  : xhr.getAllResponseHeaders(),
            status   : xhr.status,
            response : xhr.responseText,
            timestamp: Math.floor(new Date() / 1000)
          };
          console.log(obj);
          firestore.collection('cache').doc(curl).set(obj);
        }
        res.send(xhr.responseText);
      };
      //res.send(util.inspect(req.headers, { showHidden: false, depth: 3 }));
      Object.keys(req.headers).forEach((key) => {
        if (! /^(X-AppEngine-.+|x-cloud-trace-context|function-execution-id|x-forwarded-.+)$/i.test(key)){
          xhr.setRequestHeader(key, req.headers[key]);
        }
      });
      xhr.send();
    } else {
      console.log('Cache hit: ' + url);
      res.status(doc.data().status);
      res.headers = doc.data().headers.trim().split(/[\r\n]+/).forEach((line) => {
        let parts = line.split(': ');
        res.setHeader(parts.shift(), parts.join(': '));
      });
      res.setHeader('x-lot-cache', 'Hit');
      res.send(doc.data().response);
    }
  });
});


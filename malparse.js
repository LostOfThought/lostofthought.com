import { GetCache, SetCache, TryCache } from './cache.js';


let getNodeText = (node) => {
  if(!node){
    return null;
  }
  return node.innerText.trim();
};

function DeferedPromise(){
  let res;
  let rej;
  let promise = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  promise.resolve = res;
  promise.reject = rej;
  return { promise, res, rej } ;
}

function GetKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

class WebRequestParams {
  
}

function WebRequest(url, params){
    request = new XMLHttpRequest();
    request.onabort   = () => {
      promise.reject('Abort');
    };
    this.request.onerror   = () => {
      this.promise.reject('Error');
    };
    this.request.onload    = () => {
      if (this.request.status >= 200 && this.request.status < 300) {
        this.promise.resolve(this);
      } else {
        this.promise.reject('Status != 2xx: ' + this.GetStatus());
      }
    };
    //this.request.onloadstart;
    //this.request.onprogress;
    this.request.ontimeout = () => {
      this.promise.reject('timeout')
    };
    //this.request.onloadend;
  
    //request.onreadystatechange; //EventHandler
  }
  static ReadyState = Object.freeze({
    0: 'UNSENT',
    1: 'OPENED',
    2: 'HEADERS_RECEIVED',
    3: 'LOADING',
    4: 'DONE'
  });
  static Method = Object.freeze({
    'GET'    : Symbol(),
    'HEAD'   : Symbol(),
    'POST'   : Symbol(),
    'PUT'    : Symbol(),
    'DELETE' : Symbol(),
    'CONNECT': Symbol(),
    'OPTIONS': Symbol(),
    'TRACE'  : Symbol(),
    'PATCH'  : Symbol()
  });
  GetReadyState() {
    return { code: this.request.readyState, string: WebRequest.ReadyState[this.request.readyState] };
  }
  GetStatus() {
    return { code: this.request.status, string: WebRequest.Status[this.request.status] };
  }
  Abort() {
    this.request.abort();
  }
  GetResponseHeaders() {
    let headers = this.request.getAllResponseHeaders();
    if(headers){
      let ret = {};
      headers.split('\r\n').forEach((line) => {
        let header = line.split(': ', 2);
        ret[header[0]] = header[1].split(', ');
      });
      return ret;
    } else {
      return {};
    }
  }
  Open(method, url, async, user, password) {
    this.request.open(
      GetKeyByValue(WebRequest.Method, method),
      this.url,
      true,
      user,
      password
    );
    return this.promise;
  }
  /*
    //XMLHttpRequestEventTarget
    onabort
    onerror
    onload
    onloadstart
    onprogress
    ontimeout
    onloadend
    
    //EventTarget
    addEventListener
    removeEventListener
    dispatchEvent

    //XMLHttpRequest
    onreadystatechange
    */
}

function CacheURL(url, ttl){
  return TryCache(
    url,
    ttl,
    new Promise((resolve, reject) => {
      let req = new XMLHttpRequest();
      req.open('GET', url);
      req.send();
      req.addEventListener('load', () => {
        resolve(req.responseText);
      });
    })
  );
};

function StrToEl(s){
  let el = document.createElement('div');
  el.innerHTML = s;
  return el;
}

window.onload = () => {
  let req = new WebRequest( 'https://us-central1-lostofthought-com.cloudfunctions.net/cors?url='
    + encodeURIComponent('https://myanimelist.net/animelist/LostOfThought')
    + '&cache=false');
  req.Open(WebRequest.Method.GET).then((fin) => {
    console.log(fin.request.responseText);
  });
  CacheURL(
    'https://us-central1-lostofthought-com.cloudfunctions.net/cors?url='
    + encodeURIComponent('https://myanimelist.net/animelist/LostOfThought')
    + '&cache=false'
  , 10000
  ).then((response) => {
    let remote = StrToEl(/<div id="list_surround">(.*)<div id="copyright"/s.exec(response.data));
    console.log(remote)
  });
}

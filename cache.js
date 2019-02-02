import './cycle.js'

function AsString(obj){
  return JSON.stringify(JSON.decycle(obj));
}

function FromString(str){
  return JSON.retrocycle(JSON.parse(str));
}

const GetCache = function(index){
  let store = window.localStorage;
  let cache = store.getItem(AsString(index));
  if(!cache){
    return { expired: true }
  }
  cache = FromString(cache);
  cache.expired = Date.now() - cache.timestamp > cache.ttl;
  return cache;
}

const SetCache = function(index, ttl, data){
  let store = window.localStorage;
  let cache = {
    data: data,
    ttl : ttl,
    timestamp: Date.now(),
    expired: false
  }
  store.setItem(AsString(index), AsString(cache));
  return cache;
}

const TryCache = function(index, ttl, promise){
  return new Promise(
    (resolve, reject) => {
      if(GetCache(index).expired){
        promise.then((ret) => {
          resolve(SetCache(index, ttl, ret));
        });
      }
      resolve(GetCache(index));
    }
  );
}

export { GetCache, SetCache, TryCache };

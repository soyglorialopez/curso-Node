const redis = require('redis');
const config = require('../config.js')
const client = redis.createClient({
    config.cache.host,
    config.cache.port,
    config.cache.password,
});

function list(table){
    return new Promise((resolve, reject) => {
        client.get(table, (err, data)  => {
            if (err) return reject(err)
            console.log(data)
            let res = data || null
            if(data){
                res = JSON.parse(data)
            }
            resolve(res);
        })
    })
}

function get(table, id){
   return list(`${table}_${id}`)
}

function upsert(table, data){

    let key = table;
    if(data && data.id){
        key = key + '_' + data.id
    }
  
    
    client.setex(key, 20, JSON.stringify(data));
    return true;
}

module.exports = {
    list,
    get,
    upsert
}

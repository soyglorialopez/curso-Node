const request = require('request');

function createRemoteDB(host, port){
    const URL = 'http://'+ host + ':' + port;

    function list(table){
        return req('GET', table);
    }
    function get(table, id){
        return req('GET', table, id)
    }
    function upsert(table, data){
        return req('GET', table, data)
    }
    function query(table, query, join){
        return req('GET', table, join)
    }

    function req(method, table, data = ''){
        console.log(data)
        let url, body
        if(data && method == 'GET'){
             url = URL + '/' + table + '/' + data;
        }else{
            url = URL + '/' + table
            body = data;
        }
        return new Promise((resolve, reject) => {
            request({
                method,
                headers: {
                    'content-type' : 'application/json'
                },
                url,
                body
            }, (err, req, body) => {
                if(err) {
                    console.error('Error con la base de datos remota', err);
                    return reject(err.message);
                }
                const resp = JSON.parse(body);

                return resolve(resp.msg)
            })
        })
    }
    return {
        list,
        get,
        upsert,
        query
    }
}

module.exports = createRemoteDB

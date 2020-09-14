const mysql = require('mysql');

const config = require('../config');

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};
let connection;

function handleCon(){
    connection = mysql.createConnection(dbconf);

    connection.connect((err) => {
        if(err){
            console.error('[db_err]', err);
            setTimeout(handleCon, 2000)
        }else{
            console.log('DB Conectado')
        };
    });

    connection.on('error', err => {
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            handleCon()
        }else{
            throw err;
        }
    })
}

handleCon()

async function list(table){
    return new Promise((resolve, reject) => {
      connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if(err) return reject(err)

            resolve(data)
        })
   
    })
}

async function get(table, id){
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id = ${id}`, (err, data) => {
              if(err) return reject(err)
              resolve(data)
          })
     
      })   
}

function insert(tabla, data){
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${tabla} set ? `, data,  (err, data) => {
            if(err) return reject(err)
            resolve(data)
        })
})
}

function update(tabla, data){
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${tabla} set ?  WHERE id= ?`, [data, data.id],  (err, data) => {
            if(err) return reject(err)
            resolve(data)
        })
})
}

async function upsert(tabla, data, ident){
  
    if(ident){
        insert(tabla, data)
        console.log('[Data, insert]', data)
    }if(!ident){
        
        update(tabla, data)
        console.log('[Data]', data) 
}
}

function query(table, query, join){
    let joinQuery = '';
    if(join){
        console.log(join)
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`
    }
    return new Promise((resolve, reject) => {
        //mescla las tablas de user_follow y user, y donde user.id es igual user_to trae, los datos mientras el user_from de los user_to sea igaul al params.id
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.? LIMIT 2`, query,  (err, data) => {
            if(err) return reject(err)
            console.table(data)
            resolve(data[0] || null)
        })
    })
}
module.exports = {
    list,
    get,
    upsert,
    query
}

// 9P9$my4ap!uT@3i
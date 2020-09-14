const db = {
    user: [{id: 1, name: 'miran'}, {id: 2, name: 'miss'} ]
}

async function list(tabla){
    if(!db[tabla]) {
        db[tabla] = []
    }
 
    return db[tabla]
}

async function get(tabla, id){
    let col = await list(tabla);
    return col.filter(item => item.id === id)[0] || null
}

async function upsert(tabla, data){
    if(!db[tabla]) {
        db[tabla] = []
    }
   db[tabla].push(data)
   console.log(db[tabla])

  
//    return  console.log(db[tabla])

}

async function remove(tabla, id){
  
   let table = await list(tabla);
   let index = table.indexOf(id);
   let remove = table.splice(index + 1, 1 );

   return {
       table,
       remove
   }

}

async function query(tabla, q){
let col = await list(tabla);
let keys = Object.keys(q);
let key = keys[0];

    return col.filter(item => item[key] === q[key])[0] || null;


}



module.exports = {
    list,
    get,
    upsert,
    remove,
    query
}
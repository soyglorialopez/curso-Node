const auth = require('../../../auth/index');
const bcrypt = require('bcrypt');
const TABLA = 'auth'
module.exports = (injectStore) => {
    let store = injectStore;
    if (!store){
        store = require('../../../store/dummy');
    }
    
      return {
          login : async (username, password) => {
              const data = await store.query(TABLA, {username: username});
               const result = await bcrypt.compare(password, data.password)
                if(result === true){
                  
                return auth.sing({...data})
                }else{
                  throw  Error('Informacion invalida')
             }
              
          },
          upsert: async (data) => {
              const authData = {
                  id : data.id,
              }
              if(data.username){    
                  authData.username = data.username;
              }

              if(data.password){
                  authData.password = await bcrypt.hash(data.password, 5);
              }
              return store.upsert(TABLA, authData, 'isnew');
          }
      }

}



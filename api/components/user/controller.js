const nanoid = require('nano-id');
const auth = require('../auth');
const TABLA = 'users'
const error = require('../../../utils/error');
module.exports = (injectStore) => {
    let store = injectStore;
    if (!store){
        store = require('../../../store/dummy');
    }

    return {
        list: () => store.list(TABLA),
        get: (id) => store.get(TABLA, id),
        upsert: async (data, ident) => {
            if(!data.password){

                throw error('Completar datos requeridos', 400)
            }
            const user = {
                name:  data.name,
                username: data.username
              }


              if(data.id){
                  user.id = data.id
              }else{
                  user.id = nanoid()
              }

              if(data.password || data.username){
                  await auth.upsert({
                      id:user.id,
                      username: user.username,
                      password: data.password
                  })
              }
              store.upsert(TABLA, user, ident)
            },
        follow: async (from, to) =>{
          await store.upsert('users_follow', {
            user_from: from,
            user_to: to,
        }, 'new');
        },
        followers: async (id) => {
          
         let result = await store.query('user_follow', {user_to: id});
         let follows = {...result}
         console.log(follows)
         return follows.user_from
        },
        following: async (user) => {
            const join = {}
            join[TABLA] = 'user_to';
            const query =  {user_from: user};

            return await store.query('users_follow', query, join);
        },
          remove: (id)  => store.remove(TABLA, id)
    }
}

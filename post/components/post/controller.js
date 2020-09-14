const TABLA = 'posts';
const nanoid = require('nano-id');
const error = require('../../../utils/error');
module.exports = (injectStore) => {
    let store = injectStore;
    if (!store){
        store = require('../../../store/dummy');
    }

    return {
        list: () => store.list(TABLA),
        get: (id) => store.get(TABLA, id),
        add: async  (post) => {
            const data = {
                text : post.text,
                user : post.user,
                id : nanoid()
            }
            
         return  await   store.upsert(TABLA, data, 'new')
        }
    }
}
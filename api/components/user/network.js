const express = require('express');
const secure = require('./secure');
const controller = require('./index');
const router = express.Router();
const response = require('../../../network/response')


router.get('/list', async (req, res, next) => {
    let result
    try {
        result = await  controller.list(req, res)
         response(res, result, 200 )    
    } catch (error) {
        response(res, 'Error Internal', 500)
    }
})
router.get('/followers', secure('follow'), (req, res, next) => {
    console.log('hola')
    controller.followers(req.user.id)
        .then(data => {
            response(res, data, 201)
        })
        .catch(next)

})
router.get('/:id/following', (req, res, next) => {
    return controller.following(req.params.id)
        .then((data) => {
            return response(res, data, 200);
        })
        .catch(next)
})
router.get('/:id', async (req, res, next) => {
    controller.get(req.params.id)
        .then( result => {
            response(res, result, 201)})
        .catch(next)
})
router.post('/', async (req, res, next) => {
  
     controller.upsert(req.body, 'new')
    .then(()=> response(res, 'Creado', 201) )
    .catch(next)

})
router.post('/follow/:id', secure('follow'), (req, res, next) => {
    
    controller.follow(req.user.id, req.params.id)
        .then(data => {
            response(res, data, 201)
        })
        .catch(next)

})
router.put('/', secure('update'), async (req, res, next) => {
    try {
    await controller.upsert(req.body, 'new')
    response(res, 'Modificado', 200)

    } catch{
        next
    }
})
router.delete('/remove', (req, res)=> {
    controller.remove(req.body.id)
})

module.exports = router
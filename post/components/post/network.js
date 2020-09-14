const express = require('express');
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
});

router.post('/', async (req, res, next) => {
    let result
    try {
        result = await  controller.add(req.body)
         response(res, 'su post fue creado', 201 )    
    } catch (error) {
        response(res, 'Error Internal', 500)
    }
})
router.get('/:id', async (req, res, next) => {
    controller.get(req.params.id)
        .then( result => {
            response(res, result, 201)})
        .catch(next)
})


module.exports = router
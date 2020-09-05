const express = require('express');
const controller = require('./index');
const router = express.Router();
const response = require('../../../network/response');

router.post('/login', async (req, res) => {
    let result
    try {
      result = await controller.login(req.body.username, req.body.password);
      console.log('hola', req.body)
      return response(res, result, 200) 
    } catch (error) {
        console.log(error);   
        response(res, 'informacion invalida', 400);

    }
})

module.exports = router
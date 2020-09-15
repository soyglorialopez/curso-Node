const express = require('express');
const store = require('../store/redis');
const router = express.Router();
const response = require('../network/response');

router.get('/:table', async (req, res, next) => {
   
    const datos = await store.list(req.params.table)
    response(res, datos, 200)
});
router.get('/:table/:id', async (req, res, next) => {
    const datos = await store.get(req.params.table, req.params.id)
    response(res, datos, 200)
});


router.put('/:table', async (req, res, next) => {
    const datos = await store.upsert(req.params.table, req.body)
    response(res, datos, 200)
});

module.exports = router
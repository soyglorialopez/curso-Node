const express = require('express');
const app = express();
const config = require('../config');

const post = require('./components/post/network');

const error = require('../network/errors');

app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.use('/api/post', post);
app.use(error); //importante que sea el ultimo o de otra forma no se leera lass otras rutas

app.listen(config.posts.port, () => {
    console.log(`Servicios de Posts listening at http://${config.posts.host}:${config.posts.port}`)
});

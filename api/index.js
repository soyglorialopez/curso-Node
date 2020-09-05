const express = require('express');
const app = express();
const config = require('../config');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
const post = require('./components/post/network');

const error = require('../network/errors');

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api/user', user );
app.use('/api/auth', auth );
app.use('/api/post', post);
app.use(error); //importante que sea el ultimo o de otra forma no se leera lass otras rutas

app.listen(config.api.port, () => {
    console.log(` app listening at http://${config.api.host}:${config.api.port}`)
});

const response = require('./response');

function errors(err, req, res, next){
    console.error('[error]', err);
    console.log('j')
    const message = err.message || 'Error Internal';
    const status = err.statusCode || 500;

    response(res, message, status)
}

module.exports = errors

//este es un middleware que captura todos los errores y lo manda a response
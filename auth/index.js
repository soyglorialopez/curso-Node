const jwt = require('jsonwebtoken');
const config = require('../config');
const secreto = config.jwt.secret;
const error = require('../utils/error');
function sing(data){
    return jwt.sign(data, secreto);
}
function verify(iat){
    return jwt.verify(iat, secreto)
}
const check = {
    own: function(req, owner){
        const decoded = decodeHeader(req);
        console.log(decoded)
        if(decoded.id !== owner){
            throw error('No puedes hacer esto', 400)
        }
       
    },
    logged: function(req, owner){
        const decoded = decodeHeader(req);
        console.log(decoded)
    }

}
function getToken(auth){
    
    if(!auth){
        throw error('No viene Token');
    }
    if(auth.indexOf('Bearer ') === -1){
        throw error('Formto invalido');
    }

    let token = auth.replace('Bearer ','');
    return token
}
function decodeHeader(req){
    
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;
    return decoded
}

module.exports = {
    sing,
    check,

}

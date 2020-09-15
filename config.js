module.exports = {
    remoteDB: process.env.REMOTE_DB || false,
    api: {
        port: process.env.API_PORT || 3000,
        host: process.env.API_host || 'localhost'
    },
    posts: {
        port: process.env.POSTS_PORT || 3002,
        host: process.env.POSTS_host || 'localhost'
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecreta'
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'remotemysql.com',
        user: process.env.MYSQL_USER || '', //user que obtendras en remotemysql.com
        password: process.env.MYSQL_PASSWORD || '', //contraseña que obtendras en remotemysql.com
         database: process.env.MYSQL_DB || '', // nombre que obtendras en remotemysql.com
    },
    cache : {
        host: '', //en la configuracion de tu cuenta de DB en redisLab obtendras el host (endpoit antes del :)
         port: , //en la configuracion de tu cuenta de redisLab obtendras el port (endpoit despues del :)
        password: '', //en la configuracion de tu cuenta de DB en redisLab obtendras el password
    },
    mysqlService: {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 3004
    },
    cacheService: {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 3005
    }

}

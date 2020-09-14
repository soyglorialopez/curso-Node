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
        user: process.env.MYSQL_USER || 'ThC7cLpmdU',
        password: process.env.MYSQL_PASSWORD || 'Axch3RgOSZ',
         database: process.env.MYSQL_DB || 'ThC7cLpmdU',
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
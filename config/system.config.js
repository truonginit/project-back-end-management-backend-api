// package
require('dotenv').config();

/**
 * @description Cấu hình hệ thống như: Môi trường hoạt động, Database
*/

// Môi trường Development
const development = {
    app: {
        port: process.env.DEVELOPMENT_APP_PORT
    },

    database: {
        host: process.env.DEVELOPMENT_DATABASE_HOST,
        port: process.env.DEVELOPMENT_DATABASE_PORT,
        name: process.env.DEVELOPMENT_DATABASE_NAME,
    }
}

// Môi trường production
const production = {
    app: {
        port: process.env.PRODUCTION_APP_PORT
    },

    database: {
        host: process.env.PRODUCTION_DATABASE_HOST,
        port: process.env.PRODUCTION_DATABASE_PORT,
        name: process.env.PRODUCTION_DATABASE_NAME,
    }
}

// Môi trường tester
const tester = {
    app: {
        port: process.env.TESTER_APP_PORT
    },

    database: {
        host: process.env.TESTER_DATABASE_HOST,
        port: process.env.TESTER_DATABASE_PORT,
        name: process.env.TESTER_DATABASE_NAME,
    }
}

// bảng cấu hình - sử dụng Strategy Pattern
const config = {
    'development': development,
    'production' : production,
    'tester'     : development
}

// lấy cấu hình
const env = process.env.NODE_ENV || 'development';

module.exports = config[env];
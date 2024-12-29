// package
const mongoose = require('mongoose');

// config
const { database: { host, port, name } } = require('../config/system.config');

// mongo url
const MONGO_URL = `mongodb://${host}:${port}/${name}`;

// debug mongoDB trong môi trường dev
if(process.env.NODE_ENV === 'development') {
    mongoose.set('debug', true);
    mongoose.set('debug', { color: true })
}

// service
class MongoDatabase {
    /**
     * @description function kết nối mongodb
     * @param {String} type 
     */
    connect = (type='mongodb') => {
        mongoose.connect(MONGO_URL)
                .then(  () => console.log(`Management BackEnd API ::: Kết nối database thành công !!!`))
                .catch( () => console.log(`Management BackEnd API ::: Kết nối database thất bại !!!`))
    }


    /**
     * @description lấy instance của mongodb, nếu chưa có thì tạo instance mới
     */
    static getInstance = () => {
        if(!MongoDatabase.instance) {
            MongoDatabase.instance = new MongoDatabase();
        }

        return MongoDatabase.instance;
    }
}

// Tạo instance
const InstanceMongo = MongoDatabase.getInstance();

// exports
module.exports = InstanceMongo;


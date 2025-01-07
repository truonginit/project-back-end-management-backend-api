// require package
const express = require('express');
const compression = require('compression');

// require config
const { app: { port } } = require('./config/system.config');

// require database
const InstanceMongo = require('./databases/mongodb');

// require router
const adminRouter = require('./routes/admin/index.route');
const errorRouter = require('./routes/error/error.route');

// initialize database
InstanceMongo.connect();

// initialize app & port
const app = express();
const PORT = port;

// initialize compression
app.use(compression());

// initialize body-parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// initialize router
adminRouter(app);
errorRouter(app);

// listen server
app.listen(PORT, () => {
  console.log(`Khởi Động Ứng Dụng ::: Management BackEnd API`);
});
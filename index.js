// require package
const express = require('express');
const compression = require('compression');
const cors = require('cors');

// require config
const { app: { port } } = require('./config/system.config');

// require database
const InstanceMongo = require('./databases/mongodb');

// require router
const adminRouter = require('./routes/admin/index.route');
const clientRouter = require('./routes/client/index.route');
const errorRouter = require('./routes/error/error.route');
const preRouter   = require('./routes/logs/preRouter.route');

// initialize database
InstanceMongo.connect();

// initialize app & port
const app = express();
const PORT = port;

// initialize cors
app.use(cors());  // Enable All CORS Requests

// initialize compression
app.use(compression());

// initialize body-parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// initialize router
preRouter(app);     // router track log
adminRouter(app);
clientRouter(app);
errorRouter(app);

// listen server
app.listen(PORT, () => {
  console.log(`Website: kết nối thành công`);
});
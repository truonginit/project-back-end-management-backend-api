// require package
const express = require('express');

// require config
const { app: { port } } = require('./config/system.config');

// initialize app & port
const app = express();
const PORT = port;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// listen server
app.listen(PORT, () => {
  console.log(`Khởi Động Ứng Dụng ::: Management BackEnd API`);
});
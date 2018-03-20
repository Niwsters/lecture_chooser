const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');
const db = require('./db');


db.connect().then(() => {
  db.createTables();

  let app = express();
  app.use(bodyParser.json());
  app.set('view engine', 'pug');
  routes.assignRoutes(app);

  let server = require('http').createServer(app);

  let io = require('socket.io')(server);

  io.on('connection', (client) => {
    console.log('Client connected!');
    client.on('pingServer', (data) => {
      console.log(data);
    });

    io.emit('msgFromServer', 'Hi from the server! :)');
  });

  server.listen(3000, () =>{
    console.log('listening on *:3000');
  });
});

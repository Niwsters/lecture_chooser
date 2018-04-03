const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');
const db = require('./db');

const session = require('express-session');

const cors = require('cors');


db.connect().then(() => {
  db.createTables();

  let app = express();

  app.use(session({
    secret: 'hakhamaneshi',
    resave: false,
    saveUninitialized: true
  }));

  app.use(cors({
    origin: ['http://localhost:8080'],
    methods: ['GET', 'POST'],
    credentials: true
  }));

  app.use(bodyParser.json());

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

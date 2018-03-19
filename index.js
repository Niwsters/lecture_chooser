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

  app.listen(3000);
});

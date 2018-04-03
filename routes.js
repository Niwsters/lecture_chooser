// Maps all the routes

const proposal = require('./proposal');
const vote = require('./vote');
const participant = require('./participant');
const authentication = require('./authentication');
const path = require('path');

let routes = [
  {
    baseRoute: '/rest/proposal',
    controller: proposal
  },
  {
    baseRoute: '/rest/participant',
    controller: participant
  },
  {
    baseRoute: '/rest/vote',
    controller: vote
  }
];

exports.assignRoutes = (app) => {
  app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
  });

  for (let route of routes) {
    let baseRoute = route.baseRoute;
    let controller = route.controller;

    // Assign all the routes with arrow functions, to avoid a bug with "this is undefined"
    app.post(baseRoute, (req, res, next) => {
      controller.create(req, res, next);
    });

    app.get(baseRoute, (req, res, next) => {
      controller.getAll(req, res, next);
    });

    app.get(baseRoute + '/:id', (req, res, next) => {
      controller.getByID(req, res, next);
    });

    app.delete(baseRoute + '/:id', (req, res, next) => {
      controller.deleteByID(req, res, next);
    });
  }

  app.get('/rest/login', (req, res, next) => {
    authentication.login(req, res, next);
  });

  // general 404 error handling
  app.use(function (err, req, res, next) {
    res.status(404);
    res.send('could not find route ):');
  });
};

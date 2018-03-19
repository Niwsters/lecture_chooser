// Maps all the routes

const proposal = require('./proposal');
const participant = require('./participant');
const vote = require('./vote');
const path = require('path');

exports.assignRoutes = function (app) {
  app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
  });

  app.post('/rest/proposal', proposal.create);
  app.get('/rest/proposal', proposal.getAll);
  app.get('/rest/proposal/:id', proposal.getByID);
  app.delete('/rest/proposal/:id', proposal.deleteByID);

  app.post('/rest/participant', participant.create);
  app.get('/rest/participant', participant.getAll);
  app.get('/rest/participant/:id', participant.getByID);
  app.delete('/rest/participant/:id', participant.deleteByID);

  app.post('/rest/vote', vote.create);
  app.get('/rest/vote', vote.getAll);
  app.get('/rest/vote/:id', vote.getByID);
  app.delete('/rest/vote/:id', vote.deleteByID);
};

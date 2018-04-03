const VoteModel = require('./models/vote_model');
const Route = require('./route');

Route.Model = VoteModel;

VoteRoute = new Route(VoteModel);

module.exports = VoteRoute;

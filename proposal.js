const ProposalModel = require('./models/proposal_model');
const Route = require('./route');

Route.Model = ProposalModel;

ProposalRoute = new Route(ProposalModel);

module.exports = ProposalRoute;

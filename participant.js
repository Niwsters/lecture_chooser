const ParticipantModel = require('./models/participant_model');
const Route = require('./route');

Route.Model = ParticipantModel;

ParticipantRoute = new Route(ParticipantModel);

module.exports = ParticipantRoute;

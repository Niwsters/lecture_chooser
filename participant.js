const sqlite_schema = require('./sqlite_schema');
const ParticipantModel = require('./participant_model');

exports.create = function (req, res) {
  let proposalData = req.body; 

  let model = new ParticipantModel(proposalData);
  model.save();

  res.send('Participant was... HOPEFULLY created.');
};

exports.getAll = function (req, res) {
  ParticipantModel.getAll().then(proposals => { 
    res.send(proposals);
  });
};

exports.getByID = function (req, res) {
  ParticipantModel.getByID(req.params.id).then(proposal => {
    console.log(proposal);
    res.send(proposal);
  });
};

exports.deleteByID = function (req, res) {
  ParticipantModel.removeByID(req.params.id);

  res.send('Participant was... HOPEFULLY deleted.');
};

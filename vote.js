const sqlite_schema = require('./sqlite_schema');
const VoteModel = require('./vote_model');

exports.create = function (req, res) {
  let proposalData = req.body; 

  let model = new VoteModel(proposalData);
  model.save();

  res.send('Vote was... HOPEFULLY created.');
};

exports.getAll = function (req, res) {
  VoteModel.getAll().then(proposals => { 
    res.send(proposals);
  });
};

exports.getByID = function (req, res) {
  VoteModel.getByID(req.params.id).then(proposal => {
    console.log(proposal);
    res.send(proposal);
  });
};

exports.deleteByID = function (req, res) {
  VoteModel.removeByID(req.params.id);

  res.send('Vote was... HOPEFULLY deleted.');
};

const sqlite_schema = require('./sqlite_schema');
const ProposalModel = require('./proposal_model');

exports.create = function (req, res) {
  let proposalData = req.body; 

  let model = new ProposalModel(proposalData);
  model.save().then(() => {
    ProposalModel.getAll().then(proposals => {
      res.send(proposals);
    });
  });
};

exports.getAll = function (req, res) {
  ProposalModel.getAll().then(proposals => { 
    res.send(proposals);
  });
};

exports.getByID = function (req, res) {
  ProposalModel.getByID(req.params.id).then(proposal => {
    res.send(proposal);
  });
};

exports.deleteByID = function (req, res) {
  ProposalModel.removeByID(req.params.id).then(() => {
    ProposalModel.getAll().then(proposals => {
      res.send(proposals);
    });
  });
};

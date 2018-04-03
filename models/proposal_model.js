// Connects an individual proposal model to the DB.

const Model = require('./model');
const VoteModel = require('./vote_model');

class ProposalModel extends Model {
  constructor(data) {
    if (!data.description) {
      throw "Can't construct proposal model: Description not specified.";
    }

    super(data);
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      super.getAll().then(proposals => {

        // Add votes to the proposal
        VoteModel.getAll().then(votes => {
          for(let proposal of proposals) {
            proposal.votes = [];

            for(let vote of votes) {
              if(proposal.proposalID === vote.proposalID) {
                proposal.votes.push(vote);
                continue;
              }
            }
          }

          resolve(proposals);
        }, err => {
          reject(err);
        });
      }, err => {
        reject(err);
      });
    });
  }
}

ProposalModel.tableName = 'proposals';

module.exports = ProposalModel;

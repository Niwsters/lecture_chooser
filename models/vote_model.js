// Connects an individual proposal model to the DB.

const Model = require('./model');

class VoteModel extends Model {
  constructor(data) {
    if (!data.participantID) {
      throw "Can't construct proposal: participantID not specified.";
    }

    if(!data.proposalID) {
      throw "Can't construct proposal: proposalID not specified.";
    }

    super(data);
  }
}

VoteModel.tableName = 'votes';

module.exports = VoteModel;

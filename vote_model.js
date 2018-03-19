// Connects an individual proposal model to the DB.

const SQLModel = require('./sql_model');
const db = require('./db');
const Model = require('./model');

class VoteModel extends Model {
  constructor(data) {
    if (!data.participantID) {
      throw "Can't construct proposal: ParticipantID not specified.";
    }

    if(!data.proposalID) {
      throw "Can't construct proposal: ProposalID not specified.";
    }

    super(data);
  }
}

VoteModel.tableName = 'votes';

module.exports = VoteModel;

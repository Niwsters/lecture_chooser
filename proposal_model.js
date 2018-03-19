// Connects an individual proposal model to the DB.

const SQLModel = require('./sql_model');
const db = require('./db');
const Model = require('./model');

class ProposalModel extends Model {
  constructor(data) {
    if (!data.description) {
      throw "Can't construct proposal model: Description not specified.";
    }

    super(data);
  }
}

ProposalModel.tableName = 'proposals';

module.exports = ProposalModel;

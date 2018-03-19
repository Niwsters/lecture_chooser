// Connects an individual proposal model to the DB.

const SQLModel = require('./sql_model');
const db = require('./db');
const Model = require('./model');

class ParticipantModel extends Model {
  constructor(data) {
    if (!data.name) {
      throw "Can't construct proposal Name not specified.";
    }

    super(data);
  }
}

ParticipantModel.tableName = 'participants';

module.exports = ParticipantModel;

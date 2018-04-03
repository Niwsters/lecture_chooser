const Model = require('./model');
const SQLModel = require('./../sql_model');
const db = require('./../db');

class ParticipantModel extends Model {
  constructor(data) {
    if (!data.name) {
      throw "Can't construct proposal Name not specified.";
    }

    super(data);
  }
  
  static getByName(name) {
    let wheres = {
      name: name
    };

    let sql = SQLModel.selectWhereSQL(this.tableName, wheres);

    return db.select(sql);
  }
}

ParticipantModel.tableName = 'participants';

module.exports = ParticipantModel;

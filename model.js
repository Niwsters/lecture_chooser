// Connects an individual proposal model to the DB.

const SQLModel = require('./sql_model');
const db = require('./db');

class Model {
  constructor(data) {
    this.data = data;

    this.tableName = this.constructor.tableName;
  }

  save() {
    let sqlModel = new SQLModel(this.tableName, this.data);
    return db.insert(sqlModel.insertSQL);
  }

  static getAll() {
    let sql = SQLModel.selectAllSQL(this.tableName);
    return db.select(sql);
  }

  static getByID(id) {
    let wheres = {};
    wheres[this.idColName] = id;

    let sql = SQLModel.selectWhereSQL(this.tableName, wheres);
    return db.select(sql);
  }

  static removeByID(id) {
    let wheres = {};
    wheres[this.idColName] = id;

    let sql = SQLModel.deleteWhereSQL(this.tableName, wheres);
    return db.delete(sql);
  }

  static get idColName() {
    let idColName = this.tableName.slice(0,-1) + 'ID';
    return idColName;
  }
}

Model.tableName = '';

module.exports = Model;

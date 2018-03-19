class SQLModel {
  constructor(tableName, obj) {
    this.tableName = tableName;
    this.obj = obj;
  }

  get insertSQL() {
    let cols = [];
    let values = [];
    for (let col in this.obj) {
      let value = this.obj[col];
      
      cols.push(col);
      values.push(value);
    }

    let sql = "INSERT INTO " + this.tableName + "(";

    for (let i in cols) {
      let col = cols[i];

      sql += col;

      if (i+1 < cols.length) {
        sql += ", ";
      }
    }

    sql += ") VALUES('";

    for (let i in values) {
      let value = values[i];

      sql += value;

      if (i+1 < values.length) {
        sql += "', '";
      }
    }

    sql += "');";

    return sql;
  }

  static selectAllSQL(tableName) {
    return "SELECT * FROM " + tableName + ";";
  }

  static selectWhereSQL(tableName, wheres) {
    let sql = 'SELECT * FROM ' + tableName + 
      ' ' + SQLModel.generateWhereSQL(wheres);

    return sql;
  }

  static deleteWhereSQL(tableName, wheres) {
    let sql = 'DELETE FROM ' + tableName + 
      ' ' + SQLModel.generateWhereSQL(wheres);

    return sql;
  }

  static generateWhereSQL(wheres) {
    let sql = 'WHERE ';

    for (let col in wheres) {
      let value = wheres[col];

      sql += col + "='" + value + "'"; 
    }

    return sql;
  }
}

module.exports = SQLModel;

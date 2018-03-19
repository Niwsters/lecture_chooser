// A MongoDB-inspired schema class for generating a table from a JSON object.
module.exports = class { 
  constructor(modelName, specs) {
    this.tableName = modelName + 's';
    this.specs = specs;

    specs[modelName + "ID"] = "INTEGER PRIMARY KEY AUTOINCREMENT";
  }

  get createTableSQL() {
    let sql = "CREATE TABLE IF NOT EXISTS " + this.tableName + "(";

    let colcount = Object.keys(this.specs).length;

    // Loop through column specs and generate SQL string
    let i = 1;
    for (let colname in this.specs) {
      let constraints = this.specs[colname];
      sql += colname + " " + constraints;

      // Add comma only if it's not the last column specification
      if (i < colcount) {
        sql += ", ";
      }

      i++;
    }

    sql += ");";

    return sql;
  }
};

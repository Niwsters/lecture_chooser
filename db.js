// Functions for handling the connection to the SQLite database

const sqlite3 = require('sqlite3').verbose();

let db;

exports.connect = function () {
  return new Promise((resolve, reject) => {

    // Avoid recreating the database if it already exists
    if (db) {
      return db;
    }

    // Connect to database
    db = new sqlite3.Database('./lecture_chooser.db', err => {
      if (err) {
        reject(db);
      }

      console.log('Connected to SQLite database.');
      resolve(db);
    });
  });
};

exports.get = function () {
  if (db) {
    return db;
  }

  console.log('There is no database connection.');
};

//TODO: Move this to the Model module?
const schemas = require('./schemas');
const SQLiteSchema = require('./sqlite_schema');
let sqliteSchemas = [];
for (let schema in schemas) {
  let tableName = schema;
  let specs = schemas[schema];
  let sqliteSchema = new SQLiteSchema(tableName, specs);
  sqliteSchemas.push(sqliteSchema);
}

exports.createTables = function () {
  db.serialize(() => {
    for (let sqliteSchema of sqliteSchemas) {
      db.run(sqliteSchema.createTableSQL);
      console.log(sqliteSchema.createTableSQL);
    }
  });
};

exports.insert = function (sql) {
  console.log(sql);
  return new Promise((resolve, reject) => {

    db.serialize(() => {
      db.run(sql, (err) => {
        if (err) reject(err);

        resolve();
      });
    });
  });
};

exports.select = function (sql) {
  console.log(sql);
  return new Promise((resolve, reject) => { 

    db.serialize(() => {
      db.all(sql, (err, rows) => {
        if (err) {
          throw err;
        }

        resolve(rows);
      });
    });
  });
};

exports.delete = function (sql) {
  console.log(sql);
  return new Promise((resolve, reject) => {
  
    db.serialize(() => {
      db.run(sql, (err) => {
        if (err) reject(err);

        resolve();
      });
    });
  });
};

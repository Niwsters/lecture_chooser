// Responsible for defining the participants table in the database.
const SQLiteSchema = require('../tools/sqlite_schema').SQLiteSchema;

let tablename = "participants";

let schema = {
  participantID: "INT PRIMARY KEY",
  name: "TEXT NOT NULL UNIQUE"
};

module.exports = new SQLiteSchema(tablename, schema);

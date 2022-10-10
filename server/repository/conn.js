const MongoClient = require("mongodb").MongoClient;
const Db = require("mongodb").Db;

const dbName = "todo_db";

const client = new MongoClient("mongodb://root:example@mongo:27017", {
  useUnifiedTopology: true,
});

let db;

module.exports = {
  async connect() {
    console.log("Connecting to database...");
    const conn = await client.connect();
    db = conn.db(dbName);
    console.log("Successfully connected to database");
    return client;
  },
  getDatabase() {
    return db;
  },
};

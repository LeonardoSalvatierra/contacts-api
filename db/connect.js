const { MongoClient } = require('mongodb');

let database;

async function connectDB() {
  const client = new MongoClient(process.env.MONGODB_URI);

  await client.connect();

  database = client.db(process.env.MONGODB_DB);

  await database.command({ ping: 1 });

  console.log('Connected to MongoDB');
}

function getDB() {
  if (!database) {
    throw new Error('Database connection is not ready');
  }

  return database;
}

module.exports = { connectDB, getDB };
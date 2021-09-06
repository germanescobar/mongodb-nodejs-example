const { MongoClient } = require("mongodb")

const uri = "mongodb://127.0.0.1:27017/?retryWrites=true&writeConcern=majority";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const database = await client.db('topv10')
    const usersCol = await database.collection('users')

    const cursor = await usersCol.find()
    await cursor.forEach(user => console.log(user))

  } finally {
    await client.close();
  }
}

run().catch(err => console.log(err))

// versión promesas
// client.connect()
//   .then(() => client.db('topv10'))
//   .then(database => database.collection('users'))
//   .then(usersCol => ...)
//   .catch(err => console.log(err))
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json());

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

async function mongodb() {
  await client.connect();
  const db = client.db('test');
  console.log('Connected to MongoDB');
}
mongodb();

// REGISTER
 // 1. Hent username og password fra req.body
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const db = client.db('pokemonApp');
  const users = db.collection('users');
  await users.insertOne({ username, password });
  res.send('POST request received');
});

// LOGIN
 // 2. Sjekk om brukeren finnes i databasen
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const db = client.db('pokemonApp');
  const users = db.collection('users');
  const user = await users.findOne({ username });

    // 3. Sjekk passord og send bekreftelse

  if (user && user.password === password) {
    res.send('Login successful');
  } else {
    res.status(401).send('Invalid username or password');
  }
});

// START SERVER (skal alltid ligge til slutt!)
app.listen(3000, () => {
  console.log('Serveren kjører på http://localhost:3000');
});

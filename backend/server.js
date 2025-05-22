const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json());

// 0. Koble til MongoDB
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

async function mongodb() {
  await client.connect();
  const db = client.db('test');
  console.log('Connected to MongoDB');
}
mongodb();

// REGISTER
app.post('/register', async (req, res) => {
  // 1. Hent username og password fra req.body
  const { username, password } = req.body;

  // 2. Sett det inn i databasen
  const db = client.db('pokemonApp');
  const users = db.collection('users');
  await users.insertOne({ username, password });

  // 3. Send bekreftelse
  res.send('POST request received');
});

// LOGIN
app.post('/login', async (req, res) => {
  // 1. Hent username og password fra req.body
  const { username, password } = req.body;

  // 2. Sjekk om brukeren finnes i databasen
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
// START SERVER (alltid nederst!)
    app.listen(3000, () => {
    console.log('Serveren kjører på http://localhost:3000');
  });

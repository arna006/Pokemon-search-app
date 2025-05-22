
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
app.use(express.json());

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);


async function mongodb(){
    await client.connect();
    const db = client.db('test');
    console.log('Connected to MongoDB');

}

mongodb();


app.post('/register', async (req, res) =>{

    // 1. Hent username og password fra req.body
    const {username, password} = req.body;

    // 2. Sett det inn i databasen
    const db = client.db('pokemonApp');
    const users = db.collection('users');
    await users.insertOne({username, password});

    // 3. Send tilbake en bekreftelse
    res.send('POST request received');

})

app.listen(3000, () => {
    console.log('Serveren kjører på http://localhost:3000');
  });

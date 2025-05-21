
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


app.post('register', async (req, res) =>{
    res.send('POST request received');
    // 1. Hent username og password fra req.body
    // 2. Sett det inn i databasen
    // 3. Send tilbake en bekreftelse

})


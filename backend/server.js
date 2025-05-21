const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);


async function mongodb(){
    await client.connect();
    const db = client.db('test');
    console.log('Connected to MongoDB');

}
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

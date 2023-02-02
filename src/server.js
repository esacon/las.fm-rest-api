const express = require('express');
const path = require('path');
const app = express();
require('colors');
require('dotenv').config({ path: __dirname + '/utils/.env' });

// Settings
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST;

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Routes
app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname + '/index.html'));
});
app.use('/artist', require('./routes/artist.routes'));

// Run server
const server = app.listen(PORT, async () => {
    console.log(`\nServer running on ${HOST}:${PORT}`.green);
});

module.exports = { app, server };
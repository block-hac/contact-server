require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./src/config/config');
const app = express();
const api = require('./src/api');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/api', api);
mongoose.connect(config.db_url, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => {
        console.log('MongoDB successfully connected.')
    })
    .catch(err => {
        console.error(err);
    });

const server = http.createServer(app);

server.listen(config.port, '0.0.0.0', function() {
    console.log(`Server up and running on port ${config.port}`);
});
const express = require('express');
const path = require('path');
const util = require('util');

const getIp = require('./Utils/getIp');

const IP = getIp();
const app = express();

const dist = express.static(path.resolve(__dirname, '../dist'));
const static = express.static(path.resolve(__dirname, '../static'))

app.use(dist, static);

app.set('host', IP);
app.set('port', '3002');
var server = app.listen(app.get('port'), app.get('host'), function() {
    util.log(`server listening at ${app.get('host')}:${app.get('port')}......`);
})
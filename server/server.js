const path = require('path');
const os = require('os');
const util = require('util');
const express = require('express');
const history = require('connect-history-api-fallback');
const getIp = require('./Utils/getIp');

const IP = getIp();
const app = express();



// const router = express.Router();
// 要实现的是：如果url是/*之类的格式全部保留然后倒入dist/index。html文件
// router.get('/*', function(req, res) {
//  console.log(`got ${req.hostname} connect`);
// 	console.log(path.resolve(__dirname, '../dist/index.html'));
// 	res.setHeader('Content-Type', 'text/html');
// 	res.sendFile(path.resolve(__dirname, '../dist/index.html'), function(err, html) {
// 		console.log(err, '\n\n\n\n', html);
// 	})
// });
// app.use('/url', router);

const dist = express.static(path.resolve(__dirname, '../dist'));
const static = express.static(path.resolve(__dirname, '../static'));

app.use(history({
	index: '/index.html',
	verbose: true,
}));
app.use('/', dist);
app.use('/static', static);

app.set('host', IP);
app.set('port', '8844');
var server = app.listen(app.get('port'), app.get('host'), function() {
    util.log(`server listening at ${app.get('host')}:${app.get('port')}......`);
})
const os = require('os');

module.exports = function() {
	const en = os.networkInterfaces().en0 || os.networkInterfaces().eth0;
	return en.map((i) => (
		i.family === 'IPv4' ? i.address : ''
	)).join('');
}
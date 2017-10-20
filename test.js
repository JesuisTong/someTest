// console.log('hello...');
const page = require('webpage').create();
page.open('http://172.16.29.207:8844/Page', function(status) {
	console.log('status: ', status);
	if(status === "success") {
		setTimeout(function() {
			page.render('example.png');
			phantom.exit();
		}, 10000)
	}
})
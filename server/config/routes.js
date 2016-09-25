module.exports = function(app, config) {

	// Index route
	app.get('/', function(req, res) {
		//res.sendFile(config.rootPath + '/public/index.html');
	});

	// for Facebook verification
	app.get('/webhook/', function (req, res) {
	    if (req.query['hub.verify_token'] === '0ber88399fllgjh8') {
	        res.send(req.query['hub.challenge'])
	    }
	    res.send('Error, wrong token')
	})

}

var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');

app.use(bodyParser());
app.use(express.json());
app.use(express.static(__dirname + ''));
app.get('/', function(req, res){
	res.render('index', {});
	// res.send('<h1>Welcome Realtime Server</h1>');
});


http.listen(3004, function(){
	console.log('listening on *:3004');
});
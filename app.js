var express = require('express'),
	path = require('path');
	bodyParser = require('body-parser'),
	cons = require('consolidate'),
	dust = require('dustjs-helpers'),
	pg = require('pg'),
	app = express();

//var connect = "postgres://vitor:root@localhost/recipeDB";
//DATABASE CONNECTION established in /node_modules/db
const db = require('db');

//Assign Dust Engine to .dust Files
app.engine('dust', cons.dust);

// Set Default Ext .dust
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Referencing controllers
var usuarios = require('./controllers/usuarios.js')
app.use('/usuarios', usuarios);

var bikes = require('./controllers/bikes.js')
app.use('/bikes', bikes);

app.get('/', function(req, res){
	res.render('index');
});

// Server
app.listen(3000, function(){
	console.log('Server Started on Port 3000');
})

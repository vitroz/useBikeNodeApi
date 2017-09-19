var express = require('express')
var router = express.Router()

const db = require('db');

router.get('/', function(req, res){
	db.query('select * from usr_usuario', (err, result) => {
	  if(err){
	  	return console.error('error', err);
	  }

	  var usersArray = {
		    users: result.rows
		};

	  console.log(result.rows);
	  res.send(usersArray);
	});
});

app.post('/usuarios', function(req, res){

	const text = 'insert into usr_usuario(usr_username,usr_email,usr_password,usr_dt_nascimento, usr_admin) values($1, $2, $3, $4, $5) RETURNING *';
	const data = req.body;
	
	// callback
	db.query(text, [data.usr_username, data.usr_email, data.usr_password, data.usr_dt_nascimento, data.usr_admin], (err, resp) => {
	  if (err) {
	    console.log(err.stack)
	  } else {
	    var userArray = {
		    users: resp.rows
		};

	    res.send(userArray);
	  }
	})

});

app.post('/authenticate', function(req, res){

	const text = 'select u.usr_id,u.usr_username, u.usr_email, u.usr_dt_nascimento from usr_usuario u where (u.usr_username = $1 or u.usr_email = $1) and u.usr_password = $2';
	const data = req.body;
	
	// callback
	db.query(text, [data.usr_username, data.usr_password], (err, resp) => {
	  if (err) {
	    console.log(err.stack)
	  } else {

		var usersArray = {
		    users: resp.rows
		};

	  res.send(usersArray);
	  }
	})

});

router.get('/:usr_id/bikes', function(req, res){

	const text = 'select b.bks_nome,b.bks_latitude,b.bks_longitude, b.bks_disponivel from usr_usuario u join bks_bike b on u.usr_id = b.usr_id and u.usr_id = $1';

	var usr_id = req.params.usr_id;
	console.log(usr_id);
	
	// callback
	db.query(text, [usr_id], (err, resp) => {
	  if (err) {
	    console.log(err.stack)
	  } else {

	  	var bikesArray = {
		    bikes: resp.rows
		};

	    res.send(bikesArray);
	  }
	})
});


module.exports = router
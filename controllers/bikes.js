var express = require('express')
var router = express.Router()

const db = require('db');

router.get('/', function(req, res){
	db.query('select * from bks_bike b where b.bks_disponivel = true and b.usr_id is null', (err, result) => {
	  if(err){
	  	return console.error('error', err);
	  }
	  	var bikesArray = {
		    bikes: result.rows
		};

	    res.send(bikesArray);
	});
});

app.post('/bikes', function(req, res){

	const text = 'insert into bks_bike(bks_nome,bks_latitude,bks_longitude, usr_id) values($1, $2, $3, $4) RETURNING *';
	const data = req.body;
	
	// callback
	db.query(text, [data.bks_nome, data.bks_latitude, data.bks_longitude, data.usr_id], (err, res) => {
	  if (err) {
	    console.log(err.stack)
	  } else {
	    console.log(res.rows[0])
	  }
	})

});


module.exports = router
// requires
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var pg = require('pg');
var port = process.env.PORT || 6378;

// create config for the pool
var config = {
  database: 'todolist',
  host: 'localhost',
  port: 5432,
  max: 20
};

// create pool using config
var pool = new pg.Pool(config);

// uses
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

// spin up server
app.listen(port, function(){
  console.log('server up on', port);
});

// base url
app.get('/', function(req, res){
  console.log('base url hit');
  res.sendFile(path.resolve('views/index.html'));
});

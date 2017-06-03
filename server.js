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

// app.post to create task
app.post('/createTask', function(req, res){
  console.log('createTask route');
  var createdTask = {
    response: ('from createTask', req.body)};
    pool.connect(function(err, connection, done){
      if (err){
        console.log(err);
        res.send(400);
      } else {
        console.log('connected');
        res.send(createdTask);
      }
      connection.query("INSERT into todolist (task) VALUES ($1)", [req.body.task]);
      done();
    }); // end pool.connect function
  }); // end app.post to /createTask

//Niza Volair
//Activity: GET and POST checker
//http://52.24.115.207:3000/checker

var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

//GET checker creates array of objects from URL containing key value pairs
//and sets an output object data list property to the array and another to a name for the page
app.get('/checker',function(req,res){
  var queryParameters = [];
  for (var param in req.query){
    queryParameters.push({'key':param,'value':req.query[param]})
  }
  var outputObject = {};
  outputObject.list = queryParameters;
  outputObject.name = "GET";
  res.render('checker', outputObject);
});

//POST checker creates array of objects from URL containing key value pairs
//and sets an output object data list property to the array and another to a name for the page
app.post('/checker', function(req,res){
  var queryParameters = [];
  for (var param in req.body){
    queryParameters.push({'key':param,'value':req.body[param]})
  }
  var outputObject = {};
  outputObject.list = queryParameters;
  outputObject.name = "POST";
  res.render('checker', outputObject);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://52.24.115.207:' + app.get('port') + '; press Ctrl-C to terminate.');
});

var express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	cons = require('consolidate'),
	dust = require('dustjs-helpers'),
	pg = require('pg'),
	app = express();

// DB Connect String
var connect = "postgres://sanjana:123456@localhost/recipemanagementapp";

// Assign Dust Engine To .dust Files
app.engine('dust', cons.dust);

// Set Default Ext .dust
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res){
	// PG Connect
	pg.connect(connect, function(err, client, done) {
	  if(err) {
	    return console.error('error fetching client from pool', err);
	  }
	  client.query('SELECT * FROM recipes', function(err, result) {
	    if(err) {
	      return console.error('error running query', err);
	    }
	    res.render('index', {recipes: result.rows});
	    done();
	  });
	});
});

// Server
app.listen(3000, function(){
	console.log('Server Started On Port 3000');
});
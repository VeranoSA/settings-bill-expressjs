const express = require('express'); //Set up express
const exphbs  = require('express-handlebars'); //importing mport the express-handlebars module
const app = express(); //express instance

app.engine('handlebars', exphbs({defaultLayout: 'main'})); //configure express as midleware
app.set('view engine', 'handlebars');

app.get('/', function(req, res){ //add a default route
    res.render('index')  //to use res.render you need to configure a view engine for express js
});

app.use(express.static('public')); //making our public folder visible

app.post('/settings', function(req, res){  //settings route that is a post
      
});

app.post('/action', function(req, res){ //action route is a post
      
});

app.get('/actions', function(req, res){ //actions which going to display our routes
      
});

app.get('/actions/:type', function(req, res){ //actions which going helps us display calls or sms
      
});


const PORT = process.env.PORT || 3011; //Make my port number configurable

app.listen(3011, function(){
    console.log("App Started at", PORT)
});
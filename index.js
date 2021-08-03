const express = require('express'); //Set up express
const exphbs  = require('express-handlebars'); //importing mport the express-handlebars module
const bodyParser = require('body-parser'); //require our body parser
const SettingsBill = require('./settings-bill');

const app = express(); //express instance
const settingsBill = SettingsBill(); //instance

app.engine('handlebars', exphbs({defaultLayout: 'main'})); //configure express as midleware
app.set('view engine', 'handlebars');

app.use(express.static('public')); //making our public folder visible

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', function(req, res){ //add a default route
    res.render('index', {   //to use res.render you need to configure a view engine for express js
        settings: settingsBill.getSettings()  //go into my index template and render data back, sending settings objects back into my object                                                   
    
    }); 
});

app.post('/settings', function(req, res){  //settings route that is a post
      
    settingsBill.setSettings({
        callCost: req.body.callCost,
        smsCost: req.body.smsCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel,

    });
    console.log(settingsBill.getSettings()); //Checking if values are saved inside of factory function

    res.redirect('/');
});

app.post('/action', function(req, res){ //action route is a post //capture the values that we select in a form
      
});

app.get('/actions', function(req, res){ //actions which going to display our routes
      
});

app.get('/actions/:type', function(req, res){ //actions which going helps us display calls or sms
      
});


const PORT = process.env.PORT || 3011; //Make my port number configurable

app.listen(3011, function(){
    console.log("App Started at", PORT)
});
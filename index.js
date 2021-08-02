const express = require('express'); //Set up express

const app = express(); //express instance

app.get('/', function(req, res){ //add a default route
    res.send('Settings Bill App')  //Sending a message back
});

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
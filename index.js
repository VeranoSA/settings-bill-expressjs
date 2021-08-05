const express = require('express'); //Set up express
const exphbs = require('express-handlebars'); //importing mport the express-handlebars module
const moment = require('moment'); //require our body parser
const SettingsBill = require('./settings-bill');

const app = express(); //express instance
const settingsBill = SettingsBill(); //instance

moment().format()
app.engine('handlebars', exphbs({ layoutsDir: "views/layouts/" })); //configure express as midleware
app.set('view engine', 'handlebars');

app.use(express.static('public')); //making our public folder visible

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())

app.get('/', function (req, res) { //add a default route
    //setting up critical and warning levels
    let className = '';

    if (settingsBill.hasReachedWarningLevel()) {
        className = 'warning'
    }
    if (settingsBill.hasReachedCriticalLevel()) {
        className = 'danger'
    }

    //setting up my grandTotal to keep adding only its less than critical
    if (settingsBill.totals().grandTotal < settingsBill.getSettings().criticalLevel) {

    }
    res.render('index', {   //to use res.render you need to configure a view engine for express js
        settings: settingsBill.getSettings(),  //go into my index template and render data back, sending settings objects back into my object                                                   
        totals: settingsBill.totals(),
        classNames: className

    })

});

app.post('/settings', function (req, res) {  //settings route that is a post

    settingsBill.setSettings({
        callCost: req.body.callCost,
        smsCost: req.body.smsCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel,

    });
    //console.log(settingsBill.getSettings()); //Checking if values are saved inside of factory function
    res.redirect('/');
});

app.post('/action', function (req, res) { //action route is a post //capture the values that we select in a form
    // capture the call type to add
    settingsBill.recordAction(req.body.actionType)
    res.redirect('/');
});

app.get('/actions', function (req, res) { //actions which going to display our routes
    res.render('actions', {
        actions: settingsBill.actions()
    });
});

app.get('/actions/:actionType', function (req, res) { //actions which going helps us display calls or sms

    let actions = settingsBill.actions()
    actions.forEach(elem => {
        elem.timestamps = moment(elem.timestamp).fromNow();
    })

    const actionType = req.params.actionType
    res.render('actions', { actions: settingsBill.actionsFor(actionType) })
});


const PORT = process.env.PORT || 3011; //Make my port number configurable

app.listen(PORT, function () {
    console.log("App Started at", PORT)
});
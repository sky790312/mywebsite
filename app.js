/**
 * Module dependencies.
 */

var express = require('express');

/* express 4.x module */
var logger = require('morgan');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var compress = require('compression');
var errorhandler = require('errorhandler');
/* end express 4.x */


// mywebsite
var mywebsite = require('./routes/route');


var http = require('http');
var path = require('path');
var app = express();


//remove x-powered-by for security
app.disable('x-powered-by');

var contentAge = 86400000 * 7; //1day = 86400000

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/image/favicon/favicon.ico'));

/* app.use(logger()); */
app.use(bodyParser());
app.use(bodyParser.json({
    type: 'application/json'
}));
app.use(methodOverride());
app.use(cookieParser('your secret here'));
app.use(session({
    secret: 'keyboard cat',
    name: 'sid',
    cookie: {
        secure: true
    }
}));
app.use(compress());
app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: contentAge
}));

// development only
var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
    app.use(errorhandler());
}


app.get('/robots.txt', function(req, res){
    res.sendfile('public/assets/robots.txt');
});
// -- end robots.txt


// ******************************************************************************************************

// web開始
var appRouter = express.Router();

// pages
appRouter.get('/', mywebsite.index);
// appRouter.get('/projects', mywebsite.projects);

// apis
// appRouter.get('/api', mywebsite.testapi); // 測試api

app.use('/mywebsite', appRouter);



// Handle 404
app.use(function(req, res) {
    res.status(400);
    res.render('pageNotFound', {
        title: '找不到網頁'
    });
});

// Handle 500
app.use(function(error, req, res, next) {
    //console.error(error);
    console.trace(error);
    res.status(500);
    res.render('systemUpdate', {
        title: '系統升級中'
    });
});

app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

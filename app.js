// Module dependencies
const express = require('express');
const http = require('http');

const logger = require('morgan');
const fs = require('fs');
const createError = require('http-errors');

const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');

const app = express();


app.set('port', 80);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(logger('common', { stream: fs.createWriteStream('./access.log', { flags: 'a' }) }));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression({ filter: shouldCompress }));

function shouldCompress(req, res)
{
    if (req.headers['x-no-compression'])
    {
        // don't compress responses with this request header
        return false;
    }
    // fallback to standard filter function
    return compression.filter(req, res);
}

const controllers = {
    index: require('./controllers/index'),
    employees: require('./controllers/employees'),
    query: require('./controllers/query'),
};

app.get('/', controllers.index);
app.get('/employees', controllers.employees);
app.get('/query', controllers.query);


// catch 404 and forward to error handler
app.use(function(req, res, next)
{
    next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next)
{
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


http.createServer(app).listen(app.get('port'), () =>
{
    console.log('Server listening on port ' + app.get('port'));
});

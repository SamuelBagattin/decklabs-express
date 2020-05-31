const createError = require('http-errors');
const {getConf} = require("./core/configurationProvider");
    path = require('path');
    cookieParser = require('cookie-parser');
    logger = require('morgan');
    sassMiddleware = require('node-sass-middleware');

    indexRouter = require('./routes/index');

    express = require('express')
    hbs = require('hbs')
    app = express();

    dealsCronJob = require('./core/dealsCron');

dealsCronJob.startDealsCron();

hbs.registerPartials(__dirname + '/views/partials', function (err) {});

// view engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', {title: "Error", version: getConf()["releaseVersion"]});
});

module.exports = app;

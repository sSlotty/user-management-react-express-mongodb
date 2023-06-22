var express = require('express');
var bodyParser = require('body-parser');
var db = require('./config/db');
var userRouter = require('./routes/user');
var morgan = require('morgan');
require('dotenv').config()
var cors = require('cors')


const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));

app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ')
}))

const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 200
}
app.use('/api/users', cors(corsOptions), userRouter);
const onStart = () => {
    console.log(`Server started on port ${PORT}`);
}

db.connect();

app.listen(PORT, onStart);




module.exports = app;


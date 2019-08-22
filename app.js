const express = require('express');
require('./db/mongoose');
require('dotenv').config();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const middleware = require('./middleware/authRoute');
const indexRouter = require('./routes/index');
cors = require('cors');

const app = express();
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');



app.use(logger('dev'));
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const publicRouter = express.Router({prefix: ''});
const privateRouter = express.Router({prefix: ''});

app.use(publicRouter);
app.use(privateRouter);


privateRouter.use(middleware.auth);

indexRouter.router(privateRouter, publicRouter);


app.listen(3000, () => {

});


module.exports = app;

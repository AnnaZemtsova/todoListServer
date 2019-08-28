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
const rooms = [];
const server = require('http').createServer(app).listen(8000, () => {});
const io = require('socket.io').listen(server);


 app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

io.on('connection', function(socket) {
 socket.on('getAllRooms', function () {
  io.sockets.emit('broadcast', {event: 'allrooms', data: rooms});
 });

 socket.on('message', function (data) {
  io.sockets.emit('broadcast', {event: 'message', data: data});
 });

 socket.on('joinroom', function (room) {
  socket.join(room);
  socket.emit('setroom', room);
 });

 socket.on('createroom', function () {
  const room = getRandomString(4);
  rooms.push(room);
  io.sockets.emit('broadcast', {event: 'roomcreated', data: room});
 });
});

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

 const getRandomString = function randomString(length) {
  return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
 };

module.exports = app;



//-------------Work with postgres-------------------------------

// require('./db/postgre');
// const userDb = require('./postgres/user.db');
// const todoDb = require('./postgres/todos.db');

//postrgres.addUser({name: 'Lida', email:'lida@gmail.com', password: '1111'});
//postrgres.getUsers();
// todoDb.addTodo({idUser: 2, todo: 'newTodo'});
//todoDb.getTodosByUserId(2);
//todoDb.updateTodoById(4, 'aaa to do!');
//todoDb.deleteTodoById(7);

//----------------------------------------------------------------

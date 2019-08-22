const express = require('express');
const usersRouter = require('../routes/users');
const todoListRouter = require('../routes/todoList');

const router = (privateRouter, publicRouter) => {
  publicRouter.use('/users', usersRouter);
  privateRouter.use('/todoList', todoListRouter);
};

module.exports = {
  router: router
};

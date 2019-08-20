const express = require('express');
const router = new express.Router();
const User = require('../models/users');
const controller = require('../controllers/user.controller');


router.post('/signin', controller.findUser);
router.post('/signup', controller.createUser);

module.exports = router;

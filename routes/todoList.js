const express = require('express');
const router = new express.Router();
const controller = require('../controllers/todoList.controller');


router.get('', controller.getList);
router.post('', controller.addTodo);
router.put('', controller.updateTodo);
router.delete('', controller.deleteTodo);
module.exports = router;

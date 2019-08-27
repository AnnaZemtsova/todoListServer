const express = require('express');
const router = new express.Router();
const controller = require('../controllers/todoList.controller');


router.get('', controller.getList);
router.post('', controller.addTodo);
router.put('/:id', controller.updateTodo);
router.delete('/:id', controller.deleteTodo);
module.exports = router;

const TodoList = require('../models/todoList');

 const getList = async ctx => {
     try{
         const list = await TodoList.find({idUser: ctx.query.idUser});
         ctx.res.send(list);
     }catch(e){
         ctx.res.status(400).send();
     }
 };


 const addTodo = async ctx => {
     console.log(ctx.body, 'body');
     try{
         const todo = new TodoList(ctx.body);
         let a  = await todo.save();
         console.log(a, 'aaa');
         ctx.res.status(200).send(a);
    }catch(e){
         console.log(e);
        ctx.res.status(400).send();
    }
 };


const updateTodo = async ctx => {
    try{
        await TodoList.findOneAndUpdate({_id: ctx.body.idTodo}, ctx.body);
        let todo =  await TodoList.findOne({_id: ctx.body.idTodo});
        ctx.res.status(200).send(todo);
    }catch(e){
        ctx.res.status(400).send();
    }
};


const deleteTodo = async ctx => {
    try{
        let todo =  await TodoList.findOne({_id: ctx.query.idTodo});
        let idTodo = todo._id;
        await TodoList.findOneAndDelete({_id: ctx.query.idTodo});
        ctx.res.status(200).send(idTodo);
    }catch(e){
        ctx.res.status(400).send();
    }
};


module.exports = {
    getList: getList,
    updateTodo: updateTodo,
    addTodo: addTodo,
    deleteTodo: deleteTodo
};

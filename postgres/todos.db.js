const client = require('../db/postgre');
const postgresClient = client.postgresClient;

const addTodo  = async (todo) =>{
    postgresClient.query("CREATE TABLE IF NOT EXISTS todoList (\n" +
        "   _id bigserial primary key,\n" +
        "  idUser bigserial NOT NULL,\n" +
        "   todo VARCHAR (355),\n" +
        "FOREIGN KEY (idUser) REFERENCES users(_id)\n" +
        ");");
    const query = "INSERT INTO todoList(idUser, todo) VALUES ("+todo.idUser+",'"+
         todo.todo+"')";
    let a = await postgresClient.query(query);
    console.log(a);
    await postgresClient.query(query);
};

const getTodosByUserId = async (idUser) => {
    const query = await postgresClient.query("SELECT * FROM todoList WHERE idUser="+idUser).then(res => {
        console.log(res);
    });
    console.log(query);
};

const updateTodoById = async (id, todo) => {
    const query = await postgresClient.query("UPDATE todoList \n" +
        "SET todo = '"+todo+"'\n" +
        "WHERE _id='"+id+"';").then(res => {
        console.log(res);
    });
    console.log(query);
};

const deleteTodoById = async (id) => {
    const query = await postgresClient.query("DELETE FROM todoList \n" +
        "WHERE _id='"+id+"';").then(res => {
        console.log(res);
    });
    console.log(query);
};

module.exports = {
    addTodo: addTodo,
    getTodosByUserId: getTodosByUserId,
    updateTodoById: updateTodoById,
    deleteTodoById: deleteTodoById
};

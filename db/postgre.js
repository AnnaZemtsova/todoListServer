const pg = require('pg');
const conString = "postgres://postgres:1111@localhost:5432/users";

const client = new pg.Client(conString);

const connect = async () => {
    await client.connect();
};
connect();
//
// client.query("CREATE TABLE users (\n" +
//     "   _id bigserial primary key,\n" +
//     "   name varchar(20)\n" +
//     ");");
//
// client.query("CREATE TABLE todoList (\n" +
//     "   _id bigserial primary key,\n" +
//     "idUser bigserial,\n",
//     "todo varchar(20)\n"+
//     ");");


module.exports = {
    postgresClient: client
};
// client.query("CREATE TABLE junk (\n" +
//     "   id bigserial primary key,\n" +
//     "   name varchar(20)\n" +
//     ");");
// client.query("INSERT INTO junk(name) values('Ted')");
//
// console.log(client.query("INSERT INTO junk(name) values('Lola')"));
//
// const a = client.query("SELECT * FROM junk").then(next => {
//     console.log(next);
// });
// console.log(a);

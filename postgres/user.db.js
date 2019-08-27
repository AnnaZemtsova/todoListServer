const client = require('../db/postgre');
const postgresClient = client.postgresClient;

const addUser  = async (user) =>{
    await postgresClient.connect();
    postgresClient.query("CREATE TABLE IF NOT EXISTS users (\n" +
    "   _id bigserial primary key,\n" +
    "   name varchar(20),\n"+
        "password VARCHAR(50) NOT NULL,\n" +
        "email VARCHAR (355) UNIQUE NOT NULL"+
    ");");
    const query = "INSERT INTO users(name, password, email) VALUES ('"+user.name+"','"+
        user.password+"','"+ user.email+"')";
   await postgresClient.query(query);
};


const getUsers  = async () =>{
    const query = await postgresClient.query("SELECT * FROM users").then(res => {
        console.log(res);
    });
    console.log(query);
};



module.exports = {
    addUser: addUser,
    getUsers: getUsers
};

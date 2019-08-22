const mongoose  = require('mongoose');

const todoListSchema = new mongoose.Schema({
    idUser: {
        type:  mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Users'
        },
    todo: {
        type: String,
    }
});
const TodoList = mongoose.model('TodoList', todoListSchema);

module.exports  = TodoList;

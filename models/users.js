const mongoose  = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});
userSchema.virtual('todoList', {
    ref: 'TodoList',
    localField: '_id',
    foreignField: 'idUser'
});


userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({user: JSON.stringify(user)}, process.env.JWTSecret, {expiresIn: '7 days'});
    return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await Users.findOne({email});
    if(!user){
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error('Unable to login');
    }
    return user;
};

userSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(user.password, 8);
    next();
});


const Users = mongoose.model('Users', userSchema);


module.exports  = Users;

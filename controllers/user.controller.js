const User = require('../models/users');

const createUser = async (ctx) => {
        try{
            const newUser = new User(ctx.body);
            const token = await newUser.generateAuthToken();
            newUser.save();
            ctx.res.send(token);
        }catch(e){
            ctx.res.status(400).send();
        }
};

 const findUser = async ctx => {
     try{
         const user = await User.findByCredentials(ctx.body.email, ctx.body.password);
         if(user) {
             const token = await user.generateAuthToken();
             ctx.res.send(token);
         }else {
             ctx.res.status(400).send();
         }
     }catch(e){
         ctx.res.status(400).send();
     }

};

module.exports = {
    createUser: createUser,
    findUser: findUser
};

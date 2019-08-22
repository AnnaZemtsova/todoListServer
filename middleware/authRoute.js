const jwt = require('jsonwebtoken');

const auth = async (ctx) =>{
    try {
        const token = ctx.header('Authorization').replace('Bearer ','');
        jwt.verify(token, process.env.JWTSecret);
        ctx.next();
    }catch(e){
        ctx.res.status(403).send();
    }
};

module.exports = {
    auth: auth
};

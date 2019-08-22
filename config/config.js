require('dotenv').config();


const PORT = process.env.PORT || 3000;

const config = {
    development: {
        config_id: 'development',
        node_port: PORT,
        db_url: process.env.MongoURL
    },
    release: {
        config_id: 'release',
        node_port: PORT,
        db_url: process.env.MongoURL
    },
    production: {
        config_id: 'production',
        node_port: PORT,
        db_url: process.env.MongoURL
    }
};



const mongoose = require('mongoose');
require('dotenv').config()

const db = mongoose.connection;
const URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/express-mongoose';

const connect = () => {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Database connected');
    }).catch((err) => {
        console.log('Database connection failed', err);
    });
}

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log(`Connecting to database...`);
});



module.exports = {
    connect
}
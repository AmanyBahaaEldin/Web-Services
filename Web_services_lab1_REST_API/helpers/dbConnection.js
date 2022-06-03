
const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGO_DB || 'mongodb://localhost:27017/iti-25-jan-2021',
    (err) => {
    if(err) {
        console.warn("Connection to MongoDB FAILED..")
        console.error(err);
        process.exit(1);
    }
    console.info(`Connection to Database successful`);
});
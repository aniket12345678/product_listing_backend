const { default: mongoose } = require("mongoose");

async function newConnection() {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log('Connection success');
    } catch (error) {
        console.log('Connection failure:- ', error);
    }
}

module.exports = { newConnection };
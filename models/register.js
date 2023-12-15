const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Register = mongoose.model('Register', contactSchema);
module.exports = Register;
const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    firstName: String, 
    lastName: String, 
    email: String, 
    pwd: String, 
    role: String,
    adresse: String,
    speciality: String,
    status: Boolean,
    tel: Number,
    photo: String,
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note'
    }]
});
const user = mongoose.model('User', userSchema);
module.exports = user;
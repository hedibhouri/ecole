const mongoose = require('mongoose');
const courseSchema = mongoose.Schema({
    courseName: String,
    duration: Number,
    desc: String,
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note'
    }]
});
const course = mongoose.model('Course', courseSchema);
module.exports = course;
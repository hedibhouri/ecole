const mongoose = require('mongoose');
const noteSchema = mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    note: {
        type: String,
        required: true
    },
    evaluation: {
        type: String,
        required: true
    }
});
const note = mongoose.model('Note', noteSchema);
module.exports = note;

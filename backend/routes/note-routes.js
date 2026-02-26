const express = require("express")
const router = express.Router();
const Note = require("../models/note")
const User = require("../models/user")
const Course = require("../models/course")

//business logic : add note
router.post("/", (req, res) => {
    console.log("Business Logic : add note", req.body);
    let note = new Note(req.body);
    note.save().then((doc) => {
        User.updateOne({ _id: doc.student }, { $push: { notes: doc._id } }).then(() => {
            Course.updateOne({ _id: doc.course }, { $push: { notes: doc._id } }).then(() => {
                res.json({ msg: "Note added successfully", isAdded: true })
            })
        })
    }).catch((err) => {        
        res.json({ msg: "Error adding note", isAdded: false })
    })
})

//business logic : get note by student and course
router.get("/:studentId/:courseId", (req, res) => {
    console.log("Business Logic : get note by student and course");
    Note.findOne({ student: req.params.studentId, course: req.params.courseId }).then((obj) => {
        (obj) ? res.json({ foundNote: obj }) : res.json({ msg: "no found note" });
    });
})

//business logic : edit note
router.put("/", (req, res) => {
    console.log("Business Logic : edit note", req.body);
    Note.updateOne({ student: req.body.student, course: req.body.course }, req.body).then((result) => {
        console.log("result : ", result);
        (result.modifiedCount == 0) ? res.json({ msg: "Note not found", isUpdated: false }) : res.json({ msg: "Note edited succesfully", isUpdated: true })
    });
})

//business logic : delete note
router.delete("/:id", (req, res) => {
    console.log("Business Logic : delete note");
    Note.findByIdAndDelete(req.params.id).then((result) => {
        console.log("result : ", result);
        if (result) {
            User.updateOne({ _id: result.student }, { $pull: { notes: result._id } }).then(() => {
                Course.updateOne({ _id: result.course }, { $pull: { notes: result._id } }).then(() => {
                    res.json({ msg: "Note is Deleted", isDeleted: true })
                })
            })
        } else {
            res.json({ msg: "Note not found", isDeleted: false })
        }
    });
})


module.exports = router

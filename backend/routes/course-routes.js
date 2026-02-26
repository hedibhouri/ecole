const express = require("express")
//router : mini router for navigation
const router = express.Router();

const Course = require("../models/course")
const User = require("../models/user")
const Note = require("../models/note")
//business logic : get all courses
router.get("/", (req, res) => {
    console.log("Business Logic : get all courses");
    Course.find().populate("teacherId").then((tab) => {
        console.log("tab : ", tab);
        res.json({ courses: tab })
    });
})

//business logic : get Course by id
router.get("/:id", (req, res) => {
    console.log("Business Logic : get Course by id");
    Course.findById(req.params.id).populate("students").populate("teacherId").then((obj) => {
        console.log("obj : ", obj);
        (obj) ? res.json({ foundCourse: obj }) : res.json({ msg: "no found Course" });
    });
})

//business logic : delete Course by id
router.delete("/:id", (req, res) => {
    console.log("Business Logic : delete Course by id");
    Note.deleteMany({ course: req.params.id }).then(() => {
        Course.deleteOne({ _id: req.params.id }).then((result) => {
            console.log("result : ", result);
            (result.deletedCount == 0) ? res.json({ msg: `Course N° ${req.params.id} is not found`, isDeleted: false }) : res.json({ msg: "Course is Deleted", isDeleted: true })
        });
    });
})

//business logic : add Course
router.post("/", (req, res) => {
    console.log("Business Logic : add Course", req.body);
    User.findById(req.body.teacherId).then((foundUser) => {
        if (!foundUser) {
            res.json({ msg: "Teacher not found" })
        } else {
            let course = new Course(req.body);
            course.save().then((doc) => {
                console.log(doc);
                
                foundUser.courses.push(doc._id);
                foundUser.save();
                console.log(foundUser);
                console.log("doc : " + doc);
                res.json({ msg: "Course added succesfully" })
            }).catch((err) => {
                console.log("err : " + err);
                res.json({ msg: "Error during adding Course" })
            });
        }
    })
})

//business logic : edit Course
router.put("/", (req, res) => {
    console.log("Business Logic : edit Course", req.body);
    Course.updateOne({ _id: req.body._id }, req.body).then((result) => {
        console.log("result : ", result);
        (result.updatedCount == 0) ? res.json({ msg: `Course N° ${req.body._id} is not found`, isUpdated: false }) : res.json({ msg: "Course edited succesfully", isUpdated: true })
    });
})

module.exports = router
const express = require("express")
const multer = require("multer")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require("path")
//router : mini router for navigation
const router = express.Router();
const session = require("express-session")
const secretKey = 'hedi2026';
router.use(session({
    secret: secretKey,
}));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "backend/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const User = require("../models/user")
const Course = require("../models/course")
const Note = require("../models/note")
//business logic : user signup
// 1 : User signed up succesfully
// 2 : Email already exists
// 3 : Error during signup
// 4 : Phone does not exist
// 5 : Phone already exists
router.post("/signup", multer({ storage: storage }).single("img"), (req, res) => {
    console.log("Business Logic : user signup", req.body);
    User.findOne({ email: req.body.email }).then((foundUser) => {
        if (foundUser) {
            res.json({ msg: "2" })
        }
        else {
            User.findOne({ $and: [{ tel: req.body.tel }, { role: "student" }] }).then((foundUser) => {
                if (req.body.role == "parent" && !foundUser) {
                    return res.json({ msg: "4" })
                }
                if (req.body.role == "student" && foundUser) {
                    return res.json({ msg: "5" })
                }
                bcrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
                    console.log("here is crypted pwd", cryptedPwd);
                    req.body.pwd = cryptedPwd
                    if (req.body.role == 'teacher' || req.body.role == 'student') {
                        req.body.photo = (req.file) ? "http://localhost:3000/images/" + req.file.filename : req.body.photo = "http://localhost:3000/images/a.png"
                    }
                    let user = new User(req.body);
                    user.save().then((doc) => {
                        res.json({ msg: "1" })
                    }).catch((err) => {
                        res.json({ msg: "3" })
                    })
                })
            })
        }
    });
})

//business logic : user login
// 1 : login successful
// 2 : Email not found
// 3 : wrong password  
router.post("/login", (req, res) => {
    console.log("Business Logic : user login");
    console.log(req.body);
    User.findOne({ email: req.body.email }).then((foundUser) => {
        if (!foundUser) {
            return res.json({ msg: "2" })
        }
        if (foundUser.status == false) {
            return res.json({ msg: "4" })
        }
        bcrypt.compare(req.body.pwd, foundUser.pwd).then((isEqual) => {
            if (!isEqual) {
                return res.json({ msg: "3" })
            }
            let userToSend = {
                id: foundUser._id,
                firstName: foundUser.firstName,
                lastName: foundUser.lastName,
                role: foundUser.role,
                tel : foundUser.tel
            }
            let token = jwt.sign(userToSend, secretKey, { expiresIn: '1d' });
            res.json({ msg: "1", user: token })
        })
    });
})

//business logic : edit user
router.put("", (req, res) => {
    console.log("Business Logic : edit user");
    User.updateOne({ _id: req.body._id }, req.body).then((result) => {
        console.log("result : ", result);
        (result.updatedCount == 0) ? res.json({ msg: `User N° ${req.body._id} is not found`, isUpdated: false }) : res.json({ msg: "User edited succesfully", isUpdated: true })
    });
})

//business logic : get all users
router.get("/", (req, res) => {
    console.log("Business Logic : get all users");
    User.find().populate("courses").populate("notes").then((tab) => {
        console.log("tab : ", tab);
        res.json({ users: tab })
    });
})

//business logic : get user by id

router.get("/:id", (req, res) => {
    console.log("Business Logic : get user by id");
    User.findById(req.params.id).populate("courses").populate("notes").then((obj) => {
        console.log("obj : ", obj);
        (obj) ? res.json({ foundUser: obj }) : res.json({ msg: "no found user" });
    });
})

router.get("/getStudentByPhone/:tel", (req, res) => {
    console.log("Business Logic : get user by tel");
    console.log(req.params.tel);
    User.findOne({ tel: req.params.tel, role: "student" }).then((obj) => {
        console.log("obj : ", obj);
        (obj) ? res.json({ foundUser: obj }) : res.json({ msg: "no found user" });
    }).catch((err) => {
        res.json({ msg: "no found user" });
    });
})

//business logic : delete user by id
router.delete("/:id", (req, res) => {
    console.log("Business Logic : delete user by id");
    User.findById(req.params.id).then((user) => {
        if (!user) {
            return res.json({ msg: `User N° ${req.params.id} is not found`, isDeleted: false });
        }
        if (user.role == "student") {
            const studentTel = user.tel;
            Note.deleteMany({ student: user._id }).then(() => {
                Course.updateMany({ _id: { $in: user.courses } }, { $pull: { students: user._id, notes: { $in: user.notes } } }).then(() => {
                    User.deleteOne({ _id: req.params.id }).then(() => {
                        // Delete parents with the same phone number
                        User.deleteMany({ tel: studentTel, role: "parent" }).then((result) => {
                            console.log("Parents deleted: ", result.deletedCount);
                            res.json({ msg: "Student and parents are Deleted", isDeleted: true })
                        });
                    });
                });
            });
        } else if (user.role == "teacher") {
            Course.deleteMany({ _id: { $in: user.courses } }).then(() => {
                Note.deleteMany({ course: { $in: user.courses } }).then(() => {
                    User.updateMany({}, { $pull: { courses: { $in: user.courses } } }).then(() => {
                        User.deleteOne({ _id: req.params.id }).then((result) => {
                            console.log("result : ", result);
                            res.json({ msg: "Teacher is Deleted", isDeleted: true })
                        });
                    });
                });
            });
        } else {
            User.deleteOne({ _id: req.params.id }).then((result) => {
                console.log("result : ", result);
                res.json({ msg: "User is Deleted", isDeleted: true })
            });
        }
    })
})
//business logic : affect course to user
// 1 : course not found
// 2 : user not found
// 3 : user already has this course
// 4 : affectation successful
router.put("/affectCourse", (req, res) => {
    console.log("Business Logic : affect course to user", req.body);
    Course.findById(req.body.courseId).then((foundCourse) => {
        if (!foundCourse) {
            res.json({ msg: "1" })
        } else {
            User.findById(req.body._id).then((foundUser) => {
                if (!foundUser) {
                    res.json({ msg: "2" })
                } else if (foundUser.courses.indexOf(req.body.courseId) != -1) {
                    res.json({ msg: "3" })
                }
                else {
                    foundUser.courses.push(req.body.courseId);
                    foundUser.save();
                    foundCourse.students.push(req.body._id);
                    foundCourse.save();
                    res.json({ msg: "4" })
                }
            })
        }
    })
})

module.exports = router

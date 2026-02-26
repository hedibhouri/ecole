const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
mongoose.connect('mongodb://127.0.0.1:27017/EcoleDB');
const path = require("path")

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/images', express.static(path.join('backend/uploads')))


const userRoutes = require("./routes/user-routes")
const courseRoutes = require("./routes/course-routes")
const noteRoutes = require("./routes/note-routes")
app.use("/users", userRoutes)
app.use("/courses", courseRoutes)
app.use("/notes", noteRoutes)
 
module.exports = app
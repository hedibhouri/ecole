import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-affectation',
  imports: [FormsModule, NgFor],
  templateUrl: './course-affectation.component.html',
  styleUrl: './course-affectation.component.css'
})
export class CourseAffectationComponent {
  courses: any = [];
  courseId: any;
  course: any = {};
  students: any = [];
  studentId: any;
  student: any;
  errorMsg: any;
  constructor(private courseService: CourseService, private userService: UserService, private router: Router) { }
  ngOnInit() {
    this.courseService.getAllCourses().subscribe(
      (res) => {
        console.log(res);
        this.courses = res.courses;
        console.log(this.courses);
      }
    )
    this.userService.getAllUsers().subscribe(
      (res) => {
        console.log(res);
        this.students = res.users;
        this.students = this.students.filter((user: any) => user.role == "student");
        console.log(this.students);
      }
    )
  }
  affectCourse() {
    console.log("student : ",this.studentId);
    console.log("course : ",this.courseId);
    this.userService.affectCourse({ _id: this.studentId, courseId: this.courseId }).subscribe(
      (res) => {
        if (res.msg == '1') {
          this.errorMsg = "Course not found"
        }else if (res.msg == '2') {
          this.errorMsg = "User not found"
        }else if (res.msg == '3') {
          this.errorMsg = "Course already assigned to this student"
        }
        else{
          this.errorMsg = ""
          this.router.navigate(["/dashbordAdmin"]);
        }
      }
    )
  }
}

import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { jwtDecode } from 'jwt-decode';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { NoteService } from '../../services/note.service';
import { not } from 'rxjs/internal/util/not';

@Component({
  selector: 'app-my-courses',
  imports: [NgFor, NgIf],
  templateUrl: './my-courses.component.html',
  styleUrl: './my-courses.component.css'
})
export class MyCoursesComponent {
  user: any;
  t: any = [];
  id!: any
  constructor(private userService: UserService, private courseService: CourseService, private router: Router, private noteService: NoteService) { }
  ngOnInit() {
    let token = sessionStorage.getItem('token');
    if (token) {
      this.user = jwtDecode(token);
    }
    console.log("user : ", this.user);
    this.id = this.user.id
    if (this.user.role == 'parent') {
      this.userService.getStudentByPhone(this.user.tel).subscribe((data) => {
        console.log("data: ", data);
        if (data.foundUser) {
          this.id = data.foundUser?._id
          this.loadUserCourses();
        }
      })
    }
    else {
      this.loadUserCourses();
    }
  }
  loadUserCourses() {
    console.log("Final ID:", this.id);
    this.userService.getUserById(this.id).subscribe((res) => {
      console.log("res : ", res);
      this.t = res.foundUser.courses;
      console.log("courses:", this.t);
      
      // Fetch notes only if user is a student
      if (this.user.role == 'student'  || this.user.role == 'parent') {
        this.t.forEach((course: any) => {
          console.log("course : ", course);
          this.noteService.getNoteByStudentAndCourse(course._id, this.id).subscribe((res) => {
            console.log("note res: ", res);
            if (res.foundNote) {
              course.note = res.foundNote.note;
              course.evaluation = res.foundNote.evaluation;
            }else{
              course.note = "N/A";
              course.evaluation = "N/A";
            }
          });
        });
      }
    });
  }
  goToInfo(id: any) {
    this.router.navigate(['courseInfo/' + id])
  }
  seeStudents(id: any) {
    (this.user.role) == 'student' ? this.router.navigate(['/']) : this.router.navigate(['studentsTable/' + id])
  }

  goToEdit(id: any) {
    this.router.navigate(['editCourse/' + id])
  }
  deleteCourse(id: any) {
    this.courseService.deleteCourseById(id).subscribe((res) => {
      console.log(res);
      if (res.isDeleted) {
        this.loadUserCourses();
      }
    });
  }

}

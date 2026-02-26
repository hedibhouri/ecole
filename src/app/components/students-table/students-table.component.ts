import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { NgFor, NgIf } from '@angular/common';
import { NoteService } from '../../services/note.service';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-students-table',
  imports: [NgFor, NgIf],
  templateUrl: './students-table.component.html',
  styleUrl: './students-table.component.css'
})
export class StudentsTableComponent {
  students: any = [];
  courseId: any;
  user: any = {};
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private noteService: NoteService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    let token = sessionStorage.getItem('token');
    if (token) {
      this.user = jwtDecode(token);
    }
    this.courseId = this.activatedRoute.snapshot.paramMap.get('id');
    this.courseService.getCourseById(this.courseId).subscribe((res) => {
      console.log('res :', res);
      this.students = res.foundCourse.students;
      this.students.forEach((student: any) => {
        this.pushNote(student._id);
      });
    });
  }

  addNote(id: any) {
    this.router.navigate(['addNote/' + this.courseId + '/' + id]);
  }
  editNote(id: any) {
    this.router.navigate(['editNote/' + this.courseId + '/' + id]);
  }
  deleteNote(student: any) {
    if (!student.noteId) {
      return;
    }
    this.noteService.deleteNote(student.noteId)
      .subscribe((res) => {
        if (res.isDeleted) {
          student.note = null;
          student.evaluation = null;
          student.noteId = null;
        }
      });
  }

  deleteUser(student: any) {
    this.userService.deleteUserById(student._id)
      .subscribe((res) => {
        if (res.isDeleted) {
          this.students = this.students.filter((s: any) => s._id !== student._id);
        }
      });
  }


  pushNote(studentId: any) {
    this.noteService.getNoteByStudentAndCourse(studentId, this.courseId)
      .subscribe((res) => {
        let index = this.students.findIndex((s: any) => s._id === studentId);
        if (res.foundNote) {
          this.students[index].note = res.foundNote.note;
          this.students[index].evaluation = res.foundNote.evaluation;
          this.students[index].noteId = res.foundNote._id;
        } else {
          this.students[index].note = null;
          this.students[index].evaluation = null;
          this.students[index].noteId = null;
        }
      });
  }


}

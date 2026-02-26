import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-teacher',
  imports: [NgIf,],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent {

  @Input() teacher: any = {};
  studentName: string = "";
  studentCourses: number = 0;
  constructor(private userService: UserService) { }

  ngOnChanges() {
    if (this.teacher?.role === 'parent') {
      this.getStudent(this.teacher.tel);
    }
  }

  getStudent(tel: any) {
    this.userService.getStudentByPhone(tel).subscribe(
      (data: any) => {
        if (data.foundUser) {
          this.studentName =
            data.foundUser.firstName + " " + data.foundUser.lastName;
            this.teacher.photo = data.foundUser.photo
            this.studentCourses = data.foundUser.courses.length;

        }
      }
    );
  }
}


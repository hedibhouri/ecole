import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { UserService } from '../../services/user.service';
import { TeacherComponent } from '../teacher/teacher.component';

@Component({
  selector: 'app-teacher-info',
  imports: [TeacherComponent],
  templateUrl: './teacher-info.component.html',
  styleUrl: './teacher-info.component.css'
})
export class TeacherInfoComponent {
   foundTeacher: any;
  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) { }
  ngOnInit() {
    let userId = this.activatedRoute.snapshot.params["id"]
    this.userService.getUserById(userId).subscribe(
      (data: any) => {
        console.log("data", data);
        this.foundTeacher = data.foundUser
        console.log(this.foundTeacher);
        this.foundTeacher.color = this.getRandomString();
      }
    )
  }
  getRandomString(): string {
    const strings: string[] = ['#8B2635', '#0A2540', '#C9A961', '#7A9B76', '#4B0082', '#FF4500', '#2E8B57', '#6A5ACD', '#FF6347', '#20B2AA'];
    const randomIndex: number = Math.floor(Math.random() * strings.length);
    return strings[randomIndex];
  }
}

import { Component } from '@angular/core';
import { CourseComponent } from '../course/course.component';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-info',
  imports: [CourseComponent],
  templateUrl: './course-info.component.html',
  styleUrl: './course-info.component.css'
})
export class CourseInfoComponent {
  foundCourse: any;
  constructor(private activatedRoute: ActivatedRoute, private courseService: CourseService) { }
  ngOnInit() {
    let courseId = this.activatedRoute.snapshot.params["id"]
    this.courseService.getCourseById(courseId).subscribe(
      (data: any) => {
        this.foundCourse = data.foundCourse
        console.log(this.foundCourse);
        this.foundCourse.color = this.getRandomString();
      }
    )
  }
  getRandomString(): string {
    const strings: string[] = ['#8B2635', '#0A2540', '#C9A961', '#7A9B76', '#4B0082', '#FF4500', '#2E8B57', '#6A5ACD', '#FF6347', '#20B2AA'];
    const randomIndex: number = Math.floor(Math.random() * strings.length);
    return strings[randomIndex];
  }

}

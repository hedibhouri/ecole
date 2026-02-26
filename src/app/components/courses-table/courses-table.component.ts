import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses-table',
  imports: [NgFor],
  templateUrl: './courses-table.component.html',
  styleUrl: './courses-table.component.css'
})
export class CoursesTableComponent {
  t: any = [];
  constructor(private courseService: CourseService, private router: Router) { }
  ngOnInit() {
    console.log(4);
    this.courseService.getAllCourses().subscribe(
      (res) => {
        console.log(res);
        this.t = res.courses;
        console.log(this.t);
      }
    )
  }
  goToInfo(id: any) {
    console.log(id);
    this.router.navigate(['courseInfo/' + id]);
  }

  goToEdit(id: any) {
    console.log(id);
    this.router.navigate(['editCourse/' + id]);
  }

  seeStudents(id: any) {
    console.log(id);
    this.router.navigate(['studentsTable/' + id]);
  }

  deleteCourse(id: any) {
    this.courseService.deleteCourseById(id).subscribe(
      (res) => {
        if (res.isDeleted) {
          this.t = this.t.filter((course: any) => course._id !== id);
        }
      }
    );
  }
}

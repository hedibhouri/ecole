import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-add-course',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {
  addCourseForm !: FormGroup
  teacher: any
  constructor(private formBuilder: FormBuilder, private router: Router, private courseService: CourseService) { }
  ngOnInit() {
    this.addCourseForm = this.formBuilder.group({
      courseName: ["", Validators.required],
      duration: ["", Validators.required],
      desc: [""],
    })
  }
  addCourse() {
    let token = sessionStorage.getItem('token');
    if (token) {
      this.teacher = jwtDecode(token);
    }
    console.log(this.teacher);
    this.addCourseForm.value.teacherId = this.teacher.id;
    console.log(this.addCourseForm.value);
    this.courseService.addCourse(this.addCourseForm.value).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/myCourses']);
      }
    )
  }
}

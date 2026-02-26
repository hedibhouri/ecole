import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-edit-coure',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-coure.component.html',
  styleUrl: './edit-coure.component.css'
})
export class EditCoureComponent {
  editCourseForm!: FormGroup;
  id!: number;
  user: any;
  constructor(private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private courseService: CourseService) { }
  ngOnInit() {
    let token = sessionStorage.getItem('token');
    if (token) {
      this.user = jwtDecode(token);
    }
    console.log("user : ", this.user);
    this.editCourseForm = this.formBuilder.group({
      courseName: [''],
      duration: [''],
      desc: ['']
    });
    this.id = this.activatedRoute.snapshot.params['id'];
    this.courseService.getCourseById(this.id).subscribe(course => {
      this.editCourseForm.patchValue(course.foundCourse);
      console.log(course.foundCourse);
    })
  }
  editCourse() {
    let obj = {
      ...this.editCourseForm.value,
      _id: this.id   
    };

    this.courseService.editCourse(obj).subscribe(res => {
      console.log("res: ", res);

      if (this.user.role == 'teacher') {
        this.router.navigate(['/myCourses']);
      } else {
        this.router.navigate(['/dashbordAdmin']);
      }
    });
  }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { TeacherComponent } from '../teacher/teacher.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-search-teacher',
  imports: [FormsModule, NgFor, NgIf, TeacherComponent],
  templateUrl: './search-teacher.component.html',
  styleUrl: './search-teacher.component.css'
})
export class SearchTeacherComponent {

  rech: string = "";
  errorMessage: string = "";
  teachers: any[] = [];
  searched: boolean = false;

  constructor(private userService: UserService) { }

  search() {
    this.errorMessage = "";
    this.searched = false;

    this.userService.getAllUsers().subscribe({
      next: (data: any) => {
        let allTeachers = data.users.filter((user: any) => user.role === "teacher");
        this.teachers = allTeachers.filter((user: any) =>
          user.speciality?.toLowerCase().includes(this.rech.toLowerCase())
        );
        this.searched = true;
      },
      error: (err) => {
        this.errorMessage = "An error occurred while fetching teachers.";
      }
    });
  }

}
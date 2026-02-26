import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { UsersTableComponent } from '../users-table/users-table.component';
import { CoursesTableComponent } from '../courses-table/courses-table.component';

@Component({
  selector: 'app-dashbord-admin',
  imports: [UsersTableComponent, CoursesTableComponent],
  templateUrl: './dashbord-admin.component.html',
  styleUrl: './dashbord-admin.component.css'
})
export class DashbordAdminComponent {
}

import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-table',
  imports: [NgIf, NgFor],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css'
})
export class UsersTableComponent {
  t: any = [];
  allUsers: any = []; // Store all users for filtering
  selectedRole: string = ""; // Store selected role for filtering
  searchTerm: string = ""; // Store search term for filtering
  constructor(private userService: UserService, private router: Router) { }
  ngOnInit() {
    console.log(4);
    this.userService.getAllUsers().subscribe(
      (res) => {
        console.log(res);
        this.allUsers = res.users.filter((user: any) => user.role != "admin");
        this.t = this.allUsers;
        console.log(this.t);
      }
    )
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value.toLowerCase();
    
    // Start with all users (filtered by role if selected)
    let filteredUsers = this.allUsers;
    
    // Apply role filter if a role is selected
    if (this.selectedRole) {
      filteredUsers = filteredUsers.filter((user: any) => 
        user.role.toLowerCase() === this.selectedRole.toLowerCase()
      );
    }
    
    if (!this.searchTerm) {
      // If search is empty, show users based on role filter
      this.t = filteredUsers;
    } else {
      // Filter users by firstName OR lastName containing the search term (respecting role)
      this.t = filteredUsers.filter((user: any) => 
        user.firstName.toLowerCase().includes(this.searchTerm) || 
        user.lastName.toLowerCase().includes(this.searchTerm)
      );
    }
  }
  // TypeScript Method
  updateTeacherStatus(teacher: any, newStatus: string): void {
    if (newStatus == 'rejected') {
      this.userService.deleteUserById(teacher._id).subscribe(
        (res) => {
          console.log(res);
          if (res.isDeleted) {
            this.userService.getAllUsers().subscribe(
              (res) => {
                console.log(res);
                this.t = res.users;
                this.t = this.t.filter((user: any) => user.role != "admin");
                console.log(this.t);
              }
            )
          }
        }
      )
    }
    else {
      teacher.status = true;
      this.userService.editProfile(teacher).subscribe(
        (res) => {
          console.log(res);
          if (res.isUpdated) {
            this.userService.getAllUsers().subscribe(
              (res) => {
                console.log(res);
                this.t = res.users;
                this.t = this.t.filter((user: any) => user.role != "admin");
                console.log(this.t);
              }
            )
          }
        }
      )
    }
  }
  viewInfo(id: any) {
    console.log(id);
    this.router.navigate(['teacherInfo/'+ id]);
  }

  onRoleFilterChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const role = selectElement.value;
    
    // Store the selected role
    this.selectedRole = role;
    
    // Start with all users
    let filteredUsers = this.allUsers;
    
    // Apply role filter if a role is selected
    if (role) {
      filteredUsers = filteredUsers.filter((user: any) => 
        user.role.toLowerCase() === role.toLowerCase()
      );
    }
    
    // Apply search filter if there's a search term
    if (this.searchTerm) {
      filteredUsers = filteredUsers.filter((user: any) => 
        user.firstName.toLowerCase().includes(this.searchTerm) || 
        user.lastName.toLowerCase().includes(this.searchTerm)
      );
    }
    
    this.t = filteredUsers;
    console.log(this.t);
  }

  deleteUser(id: any) {
    this.userService.deleteUserById(id).subscribe(
      (res) => {
        if (res.isDeleted) {
          this.t = this.t.filter((user: any) => user._id != id);
        }
      }
    );
  }
}

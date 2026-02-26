import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup
  errorMsg!: string

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      pwd: ["", [Validators.required]]
    })

  }
  login() {
    console.log(this.loginForm.value);
    this.userService.login(this.loginForm.value).subscribe(
      (data) => {
        console.log("user : ", data);
        if (data.msg == "4") {
          this.errorMsg = "Please wait until the admin accept your request"
        } else if (data.msg != "1") {
          this.errorMsg = "Please verify your email and password"
        } else {
          this.errorMsg = ""
          sessionStorage.setItem("token", data.user)
          const decoded: any = jwtDecode(data.user)
          console.log("decoded token : ", decoded);
          (decoded.role == "admin") ? this.router.navigate(["/dashbordAdmin"]) : this.router.navigate(["/"])
        }
      }
    )
  }
}

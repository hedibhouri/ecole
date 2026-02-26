import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  user :any ={};
  constructor(private router: Router) { }
  isLoggedIn(){
    let token = sessionStorage.getItem('token');
    if(token){
      this.user =jwtDecode(token);
    }
    return !!token;
  }
  logout(){
    sessionStorage.removeItem('token');
    this.router.navigate(['']);
  }
}

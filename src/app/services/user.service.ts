import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl: string = "http://localhost:3000/users"
  constructor(private httpClient: HttpClient) { }

  login(user: any) {
    return this.httpClient.post<{ msg: string, user: any }>(this.userUrl + "/login", user)
  }

  signUp(user: any, img: File) {
    let fData = new FormData();
    fData.append("img", img);
    fData.append("firstName", user.firstName);
    fData.append("lastName", user.lastName);
    fData.append("email", user.email);
    fData.append("pwd", user.pwd);
    fData.append("status", user.status);
    fData.append("role", user.role);
    if(user.role != "admin") {
      fData.append("tel", user.tel);
      fData.append("adresse", user.adresse);
    }
    if(user.role == "teacher") {
      fData.append("speciality", user.speciality);
    }
    return this.httpClient.post<{ msg: any }>(this.userUrl + "/signup", fData)
  }

  editProfile(user: any) {
    return this.httpClient.put<{ msg: string ,isUpdated: boolean}>(this.userUrl, user)
  }

  getAllUsers() {
    return this.httpClient.get<{ users: any }>(this.userUrl)
  }

  getUserById(id: any) {
    return this.httpClient.get<{ foundUser: any , msg: string }>(this.userUrl + '/' + id)
  }

  deleteUserById(id: any) {
    return this.httpClient.delete<{ msg: string, isDeleted: boolean }>(this.userUrl + '/' + id)
  }

  affectCourse(obj: any) {
    return this.httpClient.put<{ msg: string }>(this.userUrl+"/affectCourse", obj)
  }

  getStudentByPhone(tel: any) {
    return this.httpClient.get<{ foundUser: any , msg: string }>(this.userUrl + '/getStudentByPhone/' + tel)
  }


}

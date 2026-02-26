import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courseUrl: string = "http://localhost:3000/courses"
  constructor(private httpClient: HttpClient) { }

  getAllCourses() {
    return this.httpClient.get<{ courses: any }>(this.courseUrl)
  }

  getCourseById(id: any) {
    return this.httpClient.get<{ foundCourse: any , msg: string }>(this.courseUrl + '/' + id)
  }

  deleteCourseById(id: any) {
    return this.httpClient.delete<{ msg: string, isDeleted: boolean }>(this.courseUrl + '/' + id)
  }

  addCourse(obj: any) {
    return this.httpClient.post<{ msg: string }>(this.courseUrl, obj)
  }

  editCourse(obj: any) {
    return this.httpClient.put<{ msg: string ,isUpdated: boolean}>(this.courseUrl, obj)
  }

}

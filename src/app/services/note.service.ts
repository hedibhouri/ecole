import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  noteUrl: string = "http://localhost:3000/notes"
  constructor(private httpClient: HttpClient) { }

  addNote(obj: any) {
    return this.httpClient.post<{ msg: string, isAdded: boolean }>(this.noteUrl, obj)
  }

  getNoteByStudentAndCourse(studentId: any, courseId: any) {
    return this.httpClient.get<{ foundNote: any, msg: string }>(this.noteUrl + '/' + studentId + '/' + courseId)
  }

  editNote(obj: any) {
    return this.httpClient.put<{ msg: string, isUpdated: boolean }>(this.noteUrl, obj)
  }

  deleteNote(id: any) {
    return this.httpClient.delete<{ msg: string, isDeleted: boolean }>(this.noteUrl + '/' + id)
  }
  

}
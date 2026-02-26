import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-add-note',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.css'
})
export class AddNoteComponent {
  addNoteForm !: FormGroup
  courseId: any;
  studentId: any;
  constructor(private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private noteService: NoteService) { }

  ngOnInit() {
    this.courseId = this.activatedRoute.snapshot.paramMap.get('courseId');
    this.studentId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log("course :",this.courseId);
    console.log("student :",this.studentId);
    this.addNoteForm = this.formBuilder.group({
      note: ["", [Validators.required, Validators.min(0), Validators.max(20)]],
      evaluation: ["", Validators.required],
    })
  }
  addNote(){
    this.addNoteForm.value.student = this.studentId
    this.addNoteForm.value.course = this.courseId
    this.noteService.addNote(this.addNoteForm.value).subscribe((data)=>{
      console.log(data);
      this.router.navigate(['/studentsTable', this.courseId]);
    })
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-note',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './edit-note.component.html',
  styleUrl: './edit-note.component.css'
})
export class EditNoteComponent {
  editNoteForm !: FormGroup
  courseId: any;
  studentId: any;
  constructor(private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private noteService: NoteService) { }
  ngOnInit() {
    this.courseId = this.activatedRoute.snapshot.paramMap.get('courseId');
    this.studentId = this.activatedRoute.snapshot.paramMap.get('id');
    this.editNoteForm = this.formBuilder.group({
      note: ['', [Validators.min(0), Validators.max(20)]],
      evaluation: [''],
    })
    this.noteService.getNoteByStudentAndCourse(this.studentId, this.courseId).subscribe(res =>this.editNoteForm.patchValue(res.foundNote));
  }
  editNote() {
    // Update the form values with the studentId and courseId
    this.editNoteForm.value.student = this.studentId
    this.editNoteForm.value.course = this.courseId

    // Call the editNote function from the NoteService
    this.noteService.editNote(this.editNoteForm.value).subscribe((data) => {
      console.log(data);
      // Navigate back to the studentsTable for the current course
      this.router.navigate(['/studentsTable', this.courseId]);
    })
  }

}

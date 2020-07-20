import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ExamsApiService} from "./exams-api.service";
import {Router} from "@angular/router";


@Component({
  selector: 'exam-form',
  template: `
    <div>
      <h2>New Exam</h2>
      <form ngNativeValidate #form (ngSubmit)="saveExam()">
        <mat-form-field>
        <mat-label for="exam-title">Title</mat-label>
          <input matInput id="exam-title" (keyup)="updateTitle($event)" required>
        </mat-form-field><br/>
        <mat-form-field> 
        <mat-label for="exam-description">Description</mat-label>
        <input matInput id="exam-description" (keyup)="updateDescription($event)" required>
        </mat-form-field><br/>
      </form>
      <button  mat-raised-button color="accent" (click)="form.checkValidity()? saveExam() : null">Save Exam</button>
    </div>
    `
})
export class ExamFormComponent {
  exam = {
    title: '',
    description: '',
  };

  constructor(private examsApi: ExamsApiService, private router: Router) { }

  updateTitle(event: any) {
    this.exam.title = event.target.value;
  }

  updateDescription(event: any) {
    this.exam.description = event.target.value;
  }

  saveExam() {
    this.examsApi
      .saveExam(this.exam)
      .subscribe(
        () => this.router.navigate(['/']),
        error => alert(error.message)
      );
  }
}
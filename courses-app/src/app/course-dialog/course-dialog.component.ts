import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { catchError, throwError } from 'rxjs';

import { CoursesService, LoadingService, MessagesService } from '../core';
import { Course } from '../shared/models';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss'],
  providers: [LoadingService, MessagesService],
})
export class CourseDialogComponent implements AfterViewInit {
  form: FormGroup;
  course: Course;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    private coursesService: CoursesService,
    private loadingService: LoadingService,
    private messagesService: MessagesService,
    @Inject(MAT_DIALOG_DATA) course: Course) {

    this.course = course;

    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required]
    });
  }

  ngAfterViewInit() {

  }

  save(): void {
    this.loadingService.showLoaderUntilCompleted(this.coursesService.update(this.course.id, this.form.value))
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.messagesService.showErrors(err, `Could not save ${this.course.description}`);
          return throwError(() => err);
        }),
      )
      .subscribe((course: Course) => this.close(course));
  }

  close(course?: Course): void {
    this.dialogRef.close(course);
  }
}

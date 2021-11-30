import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

import { Course } from '../shared/models';
import { CoursesService, LoadingService, MessagesService } from '../core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  constructor(
    private coursesService: CoursesService,
    private loadingService: LoadingService,
    private messagesService: MessagesService,
  ) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    const courses$ = this.loadingService.showLoaderUntilCompleted(
      this.coursesService.getAll().pipe(
        catchError((err: HttpErrorResponse) => {
          this.messagesService.showErrors(err, 'Could not load courses');
          return throwError(() => err);
        }),
      ),
    );

    this.beginnerCourses$ = courses$.pipe(
      map((courses: Course[]) => this.filterCourses(courses, 'BEGINNER')),
    );

    this.advancedCourses$ = courses$.pipe(
      map((courses: Course[]) => this.filterCourses(courses, 'ADVANCED')),
    );
  }

  private filterCourses(courses: Course[], category: 'BEGINNER' | 'ADVANCED'): Course[] {
    return courses.filter((course: Course) => course.category === category);
  }
}

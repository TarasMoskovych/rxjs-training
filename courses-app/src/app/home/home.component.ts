import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';

import { Course } from '../shared/models';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { CoursesService } from '../core/services';

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
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const courses$ = this.coursesService.getAll();

    this.beginnerCourses$ = courses$.pipe(
      map((courses: Course[]) => this.filterCourses(courses, 'BEGINNER')),
    );

    this.advancedCourses$ = courses$.pipe(
      map((courses: Course[]) => this.filterCourses(courses, 'ADVANCED')),
    );
  }

  onEditCourse(course: Course): void {
    this.dialog.open(CourseDialogComponent, {
      disableClose: true,
      autoFocus: true,
      width: '400px',
      data: course,
    });
  }

  private filterCourses(courses: Course[], category: 'BEGINNER' | 'ADVANCED'): Course[] {
    return courses.filter((course: Course) => course.category === category);
  }
}

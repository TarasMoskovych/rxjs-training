import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Course } from '../shared/models';
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
  ) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    const courses$ = this.coursesService.getAll();

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

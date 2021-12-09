import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, Observable, startWith } from 'rxjs';

import { CoursesService } from '@app/core';
import { Course, Lesson } from '@app/shared/models';

interface CourseData {
  course: Course;
  lessons: Lesson[];
}

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent implements OnInit {
  courseData$: Observable<CourseData>;

  constructor(
    private coursesService: CoursesService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const { courseId } = this.route.snapshot.params;

    this.courseData$ = combineLatest([
      this.coursesService.getById(courseId).pipe(startWith({} as Course)),
      this.coursesService.getLessonsByCourseId(courseId).pipe(startWith([])),
    ]).pipe(
      map(([course, lessons]) => ({ course, lessons })),
    );
  }
}

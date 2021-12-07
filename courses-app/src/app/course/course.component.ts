import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, Observable } from 'rxjs';
import { CoursesService } from '../core';
import { Course, Lesson } from '../shared/models';

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
      this.coursesService.getById(courseId),
      this.coursesService.getLessonsByCourseId(courseId),
    ]).pipe(
      map(([course, lessons]) => ({ course, lessons })),
    );
  }
}

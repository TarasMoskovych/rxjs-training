import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, pluck } from 'rxjs';

import { Course, sortCoursesBySeqNo } from 'src/app/shared/models';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule,
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Course[]> {
    return this.http.get<{ payload: Course[] }>('/api/courses').pipe(
      pluck('payload'),
      map((courses: Course[]) => courses.sort(sortCoursesBySeqNo)),
    );
  }
}

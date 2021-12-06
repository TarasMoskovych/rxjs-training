import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, pluck, shareReplay } from 'rxjs';

import { Course, Lesson, sortCoursesBySeqNo } from 'src/app/shared/models';
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
      shareReplay(),
    );
  }

  update(id: string, changes: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`/api/courses/${id}`, changes);
  }

  searchLessons(search: string): Observable<Lesson[]> {
    return this.http.get<{ payload: Lesson[] }>(`/api/lessons`, {
      params: {
        filter: search,
        pageSize: 100,
      },
    }).pipe(
      pluck('payload'),
      shareReplay(),
    );
  }
}

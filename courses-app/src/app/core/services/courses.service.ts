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

  getById(id: string): Observable<Course> {
    return this.http.get<Course>(`/api/courses/${id}`).pipe(
      shareReplay(),
    );
  }

  update(id: string, changes: Partial<Course>): Observable<Course> {
    return this.http.put<Course>(`/api/courses/${id}`, changes);
  }

  getLessonsByCourseId(courseId: string): Observable<Lesson[]> {
    return this.getLessons({ pageSize: 200, courseId });
  }

  searchLessons(search: string): Observable<Lesson[]> {
    return this.getLessons({ pageSize: 100, filter: search });
  }

  private getLessons(params: any): Observable<Lesson[]> {
    return this.http.get<{ payload: Lesson[] }>(`/api/lessons`, {
      params,
    }).pipe(
      pluck('payload'),
      shareReplay(),
    );
  }
}

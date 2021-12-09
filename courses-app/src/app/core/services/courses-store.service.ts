import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, pluck, shareReplay, tap, throwError } from 'rxjs';

import { CoreModule } from '@app/core/core.module';
import { Course, sortCoursesBySeqNo } from '@app/shared/models';
import { LoadingService, MessagesService } from '.';

@Injectable({
  providedIn: CoreModule,
})
export class CoursesStoreService {
  private subject = new BehaviorSubject<Course[]>([]);
  courses$ = this.subject.asObservable();

  constructor(
    private http: HttpClient,
    private loading: LoadingService,
    private messages: MessagesService,
  ) {
    this.loadAll();
  }

  filterByCategory(category: 'BEGINNER' | 'ADVANCED'): Observable<Course[]> {
    return this.courses$.pipe(
      map((courses: Course[]) => courses
        .filter((course: Course) => course.category === category)
        .sort(sortCoursesBySeqNo),
      ),
    );
  }

  update(id: string, changes: Partial<Course>): Observable<Course> {
    const courses = this.subject.getValue();
    const idx = courses.findIndex((course: Course) => course.id === id);
    const newCourse = { ...courses[idx], ...changes };
    const newCourses = courses.slice(0);

    newCourses[idx] = newCourse;
    this.subject.next(newCourses);

    return this.http.put<Course>(`/api/courses/${id}`, changes).pipe(
      catchError((err: HttpErrorResponse) => {
        this.messages.showErrors(err, `Could not save ${changes.description}`);
        return throwError(() => err);
      }),
      shareReplay(),
    );
  }

  private loadAll(): void {
    this.loading.showLoaderUntilCompleted(this.http.get<{ payload: Course[] }>('/api/courses').pipe(
      pluck('payload'),
      catchError((err: HttpErrorResponse) => {
        this.messages.showErrors(err, 'Could not load courses');
        return throwError(() => err);
      }),
      tap((courses: Course[]) => this.subject.next(courses)),
    )).subscribe();
  }
}

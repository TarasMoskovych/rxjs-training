import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, pluck, tap, throwError } from 'rxjs';

import { Course, sortCoursesBySeqNo } from 'src/app/shared/models';
import { LoadingService, MessagesService } from '.';
import { CoreModule } from '../core.module';

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

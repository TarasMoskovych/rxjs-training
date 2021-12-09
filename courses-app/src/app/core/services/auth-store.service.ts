import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, shareReplay, tap, throwError } from 'rxjs';

import { User } from '@app/shared/models';
import { CoreModule } from '@app/core/core.module';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: CoreModule,
})
export class AuthStoreService {
  private storageKey = 'auth_data';
  private userSubject = new BehaviorSubject<User | null>(null);

  user$ = this.userSubject.asObservable();
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private http: HttpClient, private storage: Storage, private messages: MessagesService) {
    this.isLoggedIn$ = this.user$.pipe(map((user: User | null) => !!user));
    this.isLoggedOut$ = this.user$.pipe(map((user: User | null) => !user));
    this.checkAuth();
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>('/api/login', { email, password }).pipe(
      tap((user: User) => {
        this.userSubject.next(user);
        this.storage.setItem(this.storageKey, JSON.stringify(user));
      }),
      shareReplay(),
      catchError((err: HttpErrorResponse) => {
        this.messages.showErrors(err, 'Wrong credentials');
        return throwError(() => err);
      })
    );
  }

  logout(): void {
    this.userSubject.next(null);
    this.storage.removeItem(this.storageKey);
  }

  private checkAuth(): void {
    const user = this.storage.getItem(this.storageKey);

    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }
}

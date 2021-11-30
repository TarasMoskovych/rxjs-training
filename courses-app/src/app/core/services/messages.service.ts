import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable()
export class MessagesService {
  private errorsSubject = new BehaviorSubject<string[]>([]);

  errors$ = this.errorsSubject.asObservable().pipe(
    filter((messages: string[]) => messages?.length > 0),
  );

  showErrors(response: HttpErrorResponse, ...errors: string[]): void {
    this.errorsSubject.next(errors);
    console.warn(response);
  }
}

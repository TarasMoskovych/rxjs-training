import './css/styles.css';

import { Observable, of, from, fromEvent, interval, range } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { concatMap, delay, switchMap } from 'rxjs/operators';
import { add, getRandomBackground, CustomObservable, User } from './ts';

// Observable
const promise = new Promise((resolve) => {
  setTimeout(() => {
    resolve('Promise');
  }, 2000);
});

const observable$ = new Observable((observer) => {
  setTimeout(() => {
    observer.next('Observable 1');
    observer.complete();
  }, 2000);
});

const customObservable$ = new CustomObservable((observer) => {
  setTimeout(() => {
    observer.next('CustomObservable');
    observer.complete();
    observer.next('CustomObservable');
  }, 2000);
});

promise.then((message: string) => add.li(message));

observable$.subscribe({
  next: (message: string) => add.li(message),
  error: (err: string) => console.error(err),
  complete: () => add.li('Completed'),
});

customObservable$.subscribe(
  (message: string) => add.li(message),
  (err: string) => console.error(err),
  () => add.li('Completed'),
);


// creating Observables
of(1, 2, 3).subscribe(add.li);

from(['value_1', 'value_2', 'value_3']).subscribe(add.li);

fromEvent(document.querySelector('button.waves-effect.waves-light.btn'), 'click').subscribe(getUser);

function getUser() {
  fromFetch('https://jsonplaceholder.typicode.com/users/1')
    .pipe(switchMap((response: Response) => response.json()))
    .subscribe((user: User) => add.li(JSON.stringify(user)));
}

interval(2000).subscribe(() => {
  document
    .querySelector('.nav-wrapper')
    .setAttribute('style', getRandomBackground());
});

range(50, 11)
  .pipe(concatMap((value: number) => of(value).pipe(delay(1000))))
  .subscribe(add.li);

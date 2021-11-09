import './css/styles.css';

import { Observable, of, from, fromEvent, interval, range } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { concatMap, delay, filter, map, pluck, switchMap, take, tap } from 'rxjs/operators';
import {
  add,
  moveTime,
  update,
  getRandomBackground,
  CustomObservable,
  Clock,
  User,
  sampleData$,
} from './ts';

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


const clock = new Clock('chart');
const secondHand = document.getElementById('seconds');
const minuteHand = document.getElementById('minutes');
const hourHand = document.getElementById('hours');

range(1, 60).subscribe((tickMark: number) => add.line(tickMark, 'seconds'));
range(1, 12).subscribe((tickMark: number) => add.line(tickMark, 'hours'));

const timeTick$ = interval(1000).pipe(
  map(() => {
    const time = new Date();

    return {
      hours: time.getHours(),
      minutes: time.getMinutes(),
      seconds: time.getSeconds(),
    };
  }),
);

timeTick$.pipe(moveTime(60, 'minutes')).subscribe(angle => {
  update.line(minuteHand, angle, 'minute');
});

timeTick$.pipe(moveTime(60, 'seconds')).subscribe(angle => {
  update.line(secondHand, angle, 'second');
});

timeTick$.pipe(moveTime(12, 'hours')).subscribe(angle => {
  update.line(hourHand, angle, 'hour');
});

// operators
const numbers = ['zero', 'one', 'two', 'three', 'four'];

interval(1000)
  .pipe(
    take(4),
    filter((value: number) => value % 2 === 0),
    map((value: number) => numbers[value]),
  )
  .subscribe(add.li);


sampleData$
  .pipe(
    tap((user: User) => add.li(`>>> ${user.name}`)),
    pluck('company', 'name')
  )
  .subscribe(add.li);

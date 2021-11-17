import './css/styles.css';

import {
  Observable,
  of,
  from,
  fromEvent,
  interval,
  range,
  merge,
  concat,
  combineLatest,
  Subject,
} from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { ajax } from 'rxjs/ajax';
import {
  concatAll,
  concatMap,
  debounceTime,
  delay,
  exhaustMap,
  filter,
  first,
  map,
  mergeAll,
  pluck,
  reduce,
  scan,
  skip,
  skipUntil,
  skipWhile,
  switchMap,
  take,
  takeUntil,
  tap,
  throttle,
} from 'rxjs/operators';
import {
  add,
  moveTime,
  update,
  getRandomBackground,
  CustomObservable,
  Clock,
  User,
  sampleData$,
  animate,
  usersUrl,
  initClock,
  initDrawer,
  initVisualizer,
} from './ts';

// components
initClock();
initDrawer();
initVisualizer();

////////////////////////////////////
// Observable
// const promise = new Promise((resolve) => {
//   setTimeout(() => {
//     resolve('Promise');
//   }, 2000);
// });

// const observable$ = new Observable((observer) => {
//   setTimeout(() => {
//     observer.next('Observable 1');
//     observer.complete();
//   }, 2000);
// });

// const customObservable$ = new CustomObservable((observer) => {
//   setTimeout(() => {
//     observer.next('CustomObservable');
//     observer.complete();
//     observer.next('CustomObservable');
//   }, 2000);
// });

// promise.then((message: string) => add.li(message));

// observable$.subscribe({
//   next: (message: string) => add.li(message),
//   error: (err: string) => console.error(err),
//   complete: () => add.li('Completed'),
// });

// customObservable$.subscribe(
//   (message: string) => add.li(message),
//   (err: string) => console.error(err),
//   () => add.li('Completed'),
// );


////////////////////////////////////
// // creating Observables
// of(1, 2, 3).subscribe(add.li);

// from(['value_1', 'value_2', 'value_3']).subscribe(add.li);

// from(fetch(api))
fromEvent(document.querySelector('button.waves-effect.waves-light.btn'), 'click').subscribe(getUser);

function getUser() {
  ajax.getJSON(`${usersUrl}/1`)
    .subscribe((user: User) => add.li(JSON.stringify(user)));
  // fromFetch(`${usersUrl}/1`)
  //   .pipe(switchMap((response: Response) => response.json()));
}

interval(2000).subscribe(() => {
  document
    .querySelector('.nav-wrapper')
    .setAttribute('style', getRandomBackground());
});

// range(50, 11)
//   .pipe(concatMap((value: number) => of(value).pipe(delay(1000))))
//   .subscribe(add.li);


////////////////////////////////////
// operators
// const numbers = ['zero', 'one', 'two', 'three', 'four'];

// interval(1000)
//   .pipe(
//     take(4),
//     filter((value: number) => value % 2 === 0),
//     map((value: number) => numbers[value]),
//   )
//   .subscribe(add.li);


////////////////////////////////////
// sampleData$
//   .pipe(
//     tap((user: User) => add.li(`>>> ${user.name}`)),
//     first(),
//     pluck('company', 'name')
//   )
//   .subscribe(add.li);


////////////////////////////////////
// from(['apples', 'grapes', 'oranges', 'pears'])
//   .pipe(
//     skip(2),
//   )
//   .subscribe(add.li);


////////////////////////////////////
// interval(1000)
//   .pipe(
//     take(10),
//     skipWhile((value: number) => value < 4),
//   )
//   .subscribe(add.li);


////////////////////////////////////
// const buttonEvents$ = fromEvent(document.querySelector('button.waves-effect.waves-light.btn'), 'click');

// interval(1000)
//   .pipe(
//     skipUntil(buttonEvents$),
//   )
//   .subscribe(add.li);


// interval(1000)
//   .pipe(
//     takeUntil(buttonEvents$),
//   )
//   .subscribe(add.li);


////////////////////////////////////
// interval(10)
//   .pipe(
//     throttle(() => interval(1000)),
//     take(10),
//   )
//   .subscribe(add.li);


////////////////////////////////////
fromEvent(document.querySelector('input'), 'keyup')
  .pipe(
    debounceTime(1000),
  )
  .subscribe((e: InputEvent) => document.querySelector('.brand-logo').textContent = (e.target as HTMLInputElement).value);


////////////////////////////////////
interval(100)
  .pipe(
    take(10),
    // scan((acc: number[], value: number) => {
    //   const n = value + 1;
    //   return [...acc, acc[n] + acc[n - 1]];
    // }, [0, 1]),
    reduce((acc: number[], value: number) => {
      const n = value + 1;
      return [...acc, acc[n] + acc[n - 1]];
    }, [0, 1]),
  )
  .subscribe(console.log);


////////////////////////////////////
// const s1$ = interval(1000).pipe(take(10));
// const s2$ = fromEvent(document.querySelector('button'), 'click').pipe(map(() => 'clicked'));

// merge(s1$, s2$).subscribe(add.li);
// concat(s1$, s2$).subscribe(add.li);
// combineLatest([s1$, s2$]).subscribe(add.li);


////////////////////////////////////
// const s1$ = fromEvent(document.querySelector('button'), 'click');
// const source$ = s1$
//   .pipe(
//     tap(() => add.li('click')),
//     map(() => interval(1000).pipe(take(3))),
//   );

// source$.pipe(
//   // concatAll(),
//   mergeAll(), // mergeAll(1) = concatAll(),
// ).subscribe(add.li);


////////////////////////////////////
const circle = document.getElementById('circle');

fromEvent(document.querySelector('button'), 'click')
  .pipe(
    exhaustMap(() => animate(2000)),
  )
  .subscribe((t: number) => circle.style.left = `calc(${t * 100}% - 50px)`);


////////////////////////////////////
// cold (unicast)
const obs$ = new Observable((observer) => observer.next(Date.now()));

obs$.subscribe(add.li);
obs$.subscribe(add.li);

// hot (multicast)
const sub = new Subject();

sub.subscribe((val: number) => add.li('S: ' + val));
sub.subscribe((val: number) => add.li('S: ' + val));
sub.next(Date.now());

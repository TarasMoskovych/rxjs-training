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
} from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
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
} from './ts';

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
  fromFetch(`${usersUrl}/1`)
    .pipe(switchMap((response: Response) => response.json()))
    .subscribe((user: User) => add.li(JSON.stringify(user)));
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
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const brush = (coords: { x: number, y: number }): void => {
  context.lineWidth = 5;
  context.lineTo(coords.x, coords.y);
  context.stroke();
};

const moves$ = fromEvent(canvas, 'mousemove');
const down$ = fromEvent(canvas, 'mousedown');
const up$ = fromEvent(canvas, 'mouseup');

down$
  .pipe(
    tap((evt: MouseEvent) => {
      context.strokeStyle = 'purple';
      context.beginPath();
      context.moveTo(evt.offsetX, evt.offsetY);
    }),
    switchMap(() => moves$.pipe(
      map((evt: MouseEvent) => ({ x: evt.offsetX, y: evt.offsetY })),
      takeUntil(up$),
    )),
  )
  .subscribe(brush);


////////////////////////////////////
const circle = document.getElementById('circle');

fromEvent(document.querySelector('button'), 'click')
  .pipe(
    exhaustMap(() => animate(2000)),
  )
  .subscribe((t: number) => circle.style.left = `calc(${t * 100}% - 50px)`);

import { interval, range } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  add,
  moveTime,
  update,
  Clock,
} from './../libs';

export const initClock = () => {
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
};

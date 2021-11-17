import { fromEvent } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';

export const initDrawer = () => {
  const canvas = document.querySelector('.canvas-draw') as HTMLCanvasElement;
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
};

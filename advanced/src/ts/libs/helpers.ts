import { interval, pipe, animationFrameScheduler, of } from 'rxjs';
import { take, map, scan, takeWhile, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { User } from '../models';

const svgNamespace = 'http://www.w3.org/2000/svg';

export const usersUrl = 'https://jsonplaceholder.typicode.com/users';

export const sampleData$ = ajax.getJSON(usersUrl).pipe(
  switchMap((users: User[]) => of(...users)),
);

export const add = {
  li: printLi,
  div: printDiv,
  line: printLine,
  stream: printStream,
  result: printResult,
};

export const update = {
  line: updateLine,
};

export const getRandomBackground = () => `background-color: rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}) !important`;

const clock = {
  seconds: 60,
  hours: 12,
  radius: 125,
  width: 400,
  height: 400,
  secondsHandLength: 10,
  secondsHandColor: '#999',
  secondsHandWidth: '1',
  hoursHandLength: 20,
  hoursHandColor: '#656565',
  hoursHandWidth: '3',
  totalRadians: 2 * Math.PI,
  increments(n: number): number {
    return this.totalRadians / n;
  },
  initial: 0,
};

clock.initial = clock.totalRadians * 0.75;


export class Clock {
  constructor(parent: string) {
    const p = document.getElementById(parent);
    const svg = document.createElementNS(svgNamespace, 'svg');

    svg.setAttribute('width', String(clock.width));
    svg.setAttribute('height', String(clock.height));
    svg.setAttribute('style', 'background-color:#eee;margin:50px;border-radius:50%;box-shadow: 1px 2px 3px #bbb');
    svg.id = 'display-svg';

    const bg = document.createElementNS(svgNamespace, 'circle');
    const secondsLine = document.createElementNS(
      svgNamespace,
      'line'
    );
    const minutesLine = document.createElementNS(
      svgNamespace,
      'line'
    );
    const hoursLine = document.createElementNS(
      svgNamespace,
      'line'
    );
    const pin = document.createElementNS(
      svgNamespace,
      'circle'
    );
    bg.setAttribute('r', String(clock.radius));
    bg.setAttribute('cx', String(clock.width / 2));
    bg.setAttribute('cy', String(clock.height / 2));
    bg.setAttribute('fill', '#fff');
    bg.setAttribute('stroke', '#bbb');
    bg.setAttribute('stroke-width', '4');
    svg.appendChild(bg);
    secondsLine.id = 'seconds';
    secondsLine.setAttribute('x1', '200');
    secondsLine.setAttribute('y1', '200');
    secondsLine.setAttribute('x2', '200');
    secondsLine.setAttribute('y2', '75');
    secondsLine.setAttribute('stroke', 'rgb(250,0,100)');
    secondsLine.setAttribute('stroke-width', '3');
    svg.appendChild(secondsLine);
    minutesLine.id = 'minutes';
    minutesLine.setAttribute('x1', '200');
    minutesLine.setAttribute('y1', '200');
    minutesLine.setAttribute('x2', '200');
    minutesLine.setAttribute('y2', '75');
    minutesLine.setAttribute('stroke', 'rgb(100,0,100)');
    minutesLine.setAttribute('stroke-width', '3');
    svg.appendChild(minutesLine);
    hoursLine.id = 'hours';
    hoursLine.setAttribute('x1', '200');
    hoursLine.setAttribute('y1', '200');
    hoursLine.setAttribute('x2', '200');
    hoursLine.setAttribute('y2', '75');
    hoursLine.setAttribute('stroke', 'rgb(100,0,100)');
    hoursLine.setAttribute('stroke-width', '5');
    svg.appendChild(hoursLine);
    pin.setAttribute('r', '5');
    pin.setAttribute('cx', String(clock.width / 2));
    pin.setAttribute('cy', String(clock.height / 2));
    pin.setAttribute('fill', '#333');
    svg.appendChild(pin);

    p.appendChild(svg);

    return clock;
  }
}

export function incrementAngle() {
  return map(() => {
    return clock.increments(60);
  });
}

export function tickForward(n: number) {
  return pipe(
    take(n),
    map(() => {
      return clock.increments(60);
    }),
    scan((acc, increments) => {
      let newAngle = acc + increments;
      if (newAngle > clock.totalRadians) {
        acc = clock.increments(60);
        newAngle = clock.increments(60);
      }
      return newAngle;
    }, clock.initial)
  );
}

export function moveTime(n: number, type: string) {
  return map((t: any) => {
    let m = t[type] * clock.increments(n);
    let b = m - clock.increments(n) * (n * 0.25);
    return b;
  });
}

export const counter = interval(1000).pipe(
  take(20),
  map(x => {
    return `Count of: ${x + 1}`;
  })
);

export const delayByThree = new Promise(resolve => {
  setTimeout(() => {
    resolve('I waited for 3 seconds');
  }, 3000);
});

function printLine(tick: number, type: string) {
  let angle;
  let width = '1';
  let color = '#333';
  let radius = clock.radius;
  let length = 10;

  switch (type) {
    case 'seconds':
      length = clock.secondsHandLength;
      color = clock.secondsHandColor;
      width = clock.secondsHandWidth;
      angle = tick * clock.increments(60);
      break;
    case 'hours':
      length = clock.hoursHandLength;
      color = clock.hoursHandColor;
      width = clock.hoursHandWidth;
      angle = tick * clock.increments(12);
      break;
    case 'minutes':
      //todo add minute variables
      break;
  }

  let coords = {
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0
  };

  let c = color;
  let sw = width;

  coords.x2 = 200 + Math.cos(angle) * radius;
  coords.y2 = 200 + Math.sin(angle) * radius;
  coords.x1 = 200 + Math.cos(angle) * (radius - length);
  coords.y1 = 200 + Math.sin(angle) * (radius - length);

  const svg = document.getElementById('display-svg');

  const line = document.createElementNS(svgNamespace, 'line');

  line.setAttribute('stroke', c);
  line.setAttribute('stroke-width', sw);
  line.setAttribute('x1', String(coords.x1));
  line.setAttribute('x2', String(coords.x2));
  line.setAttribute('y1', String(coords.y1));
  line.setAttribute('y2', String(coords.y2));
  svg.appendChild(line);
}

function printLi(value: any) {
  const ul = document.getElementById('display-list');
  const item = document.createElement('li');
  item.innerHTML = value;
  item.className = 'collection-item';
  ul.appendChild(item);
  setTimeout(function () {
    item.className = item.className + ' show';
  }, 100);
}

function printResult(value: string, id: string) {
  const container = document.getElementById('results-container');
  const item = document.createElement('a');
  item.innerHTML = `${value}`;
  item.setAttribute('data', id);
  item.setAttribute('href', '#!')
  item.className = 'collection-item  pink-text ';
  container.appendChild(item);
}

function printDiv(value: string) {
  const main = document.getElementById('image-container');
  const item = document.createElement('div');
  item.innerHTML = value;
  main.appendChild(item);
}

function printStream(value: string) {
  const pipe = document.getElementById('pipe');
  const item = document.createElement('div');
  item.innerHTML = `<span>${value}</span>`;
  item.className = 'stream-item';
  pipe.appendChild(item);
  setTimeout(function () {
    item.className = item.className + ' streamed';
  }, 500);
}

function updateLine(element: HTMLElement, angle: number, type: string) {
  let radius = 125;
  const width = clock.width;
  const height = clock.height;

  if (type === 'hour') {
    radius = 75;
  }

  const newX2 = width / 2 + Math.cos(angle) * radius;
  const newY2 = height / 2 + Math.sin(angle) * radius;

  element.setAttribute('x2', String(newX2));
  element.setAttribute('y2', String(newY2));
}

export function radians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

/**
 * buildArray Creates an Array with a sequence of numbers.
 * @param {number} number The amount of items the created Array will have.
 * @returns {number[]} The returned Array will start the first item with '1', and will count up until there are no more items
 */
export function buildArray(n: number) {
  return new Array(n).fill(1).map((_, i) => {
    return i + 1;
  });
}

function elapsed() {
  const start = animationFrameScheduler.now();
  return interval(0, animationFrameScheduler).pipe(
    map(() => animationFrameScheduler.now() - start)
  );
}

export function animate(durationTime: number) {
  return elapsed().pipe(
    map(
      (elapsedTime) => {
        return elapsedTime / durationTime
      }),
    takeWhile(t => t <= 1)
  );
}

export const ease = {
  backInOut,
  linear,
  bounceIn,
  bounceOut,
  expoInOut
};

//Easing functions from http://github.com/mattdesl/eases
//Based off of Rober Penner's equations


function backInOut(t: number) {
  var s = 1.70158 * 1.525;
  if ((t *= 2) < 1) return 0.5 * (t * t * ((s + 1) * t - s));
  return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2);
}

function linear(t: number) { return t }

function bounceIn(t: number) {
  return 1.0 - bounceOut(1.0 - t);
}

function bounceOut(t: number) {
  const a = 4.0 / 11.0;
  const b = 8.0 / 11.0;
  const c = 9.0 / 10.0;

  const ca = 4356.0 / 361.0;
  const cb = 35442.0 / 1805.0;
  const cc = 16061.0 / 1805.0;

  const t2 = t * t;

  return t < a
    ? 7.5625 * t2
    : t < b
      ? 9.075 * t2 - 9.9 * t + 3.4
      : t < c
        ? ca * t2 - cb * t + cc
        : 10.8 * t * t - 20.52 * t + 10.72;
}

function expoInOut(t: number) {
  return (t === 0.0 || t === 1.0)
    ? t
    : t < 0.5
      ? +0.5 * Math.pow(2.0, (20.0 * t) - 10.0)
      : -0.5 * Math.pow(2.0, 10.0 - (t * 20.0)) + 1.0;
}

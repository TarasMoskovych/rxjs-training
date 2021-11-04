import './styles.css';

import { Observable } from 'rxjs';
import { add } from './helpers';
import { CustomObservable } from './observable';

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

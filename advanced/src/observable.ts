interface Observer<T> {
  next(value: T): void;
  error(err: any): void;
  complete(): void;
}

interface Subscription {
  unsubscribe(): void;
}

export class CustomObservable<T> {
  private completed = false;

  constructor(
    private observe: (observer: Observer<T>) => (() => void) | void,
  ) { }

  subscribe(next?: (value: T) => void, error?: (err: any) => void, complete?: () => void): Subscription {
    const observer: Observer<T> = {
      next: (value: T) => !this.completed && next && next(value),
      error: (err: any) => !this.completed && error && error(err),
      complete: () => {
        if (complete) {
          this.completed = true;
          complete();
        }
      },
    };

    const teardown = this.observe(observer);

    return {
      unsubscribe: () => {
        if (teardown) {
          this.completed = true;
          teardown();
        }
      },
    };
  }
}

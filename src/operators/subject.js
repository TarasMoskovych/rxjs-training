const subject = () => {
    const subject$ = new rxjs.Subject();
    const subject2$ = new rxjs.BehaviorSubject('String'); // initial value
    const subject3$ = new rxjs.ReplaySubject(1);
    const subject4$ = new rxjs.AsyncSubject(1);

    const int$ = new rxjs.interval(1000);

    subject$.subscribe(createSubscribe('subject'));
    subject$.next(1);
    subject$.next(2);

    setTimeout(() => {
        subject$.next(3);
        subject$.complete();
    }, 2000);

    int$.subscribe(subject$);
    subject$.subscribe(createSubscribe('subject 1'));

    subject2$.subscribe(createSubscribe('BehaviorSubject1'));
    subject2$.next('Hello');
    subject2$.complete();

    subject3$.next(1);
    subject3$.next(2);
    subject3$.next(3);
    subject3$.complete();
    subject3$.subscribe(createSubscribe('ReplaySubject'));

    subject4$.next(1);
    subject4$.next('Str'); // only last triggered value
    subject4$.complete();
    subject4$.subscribe(createSubscribe('AsyncSubject'));
}

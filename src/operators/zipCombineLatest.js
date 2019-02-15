const zipCombineLatest = () => {
    const s1$ = rxjs.of('Hello');
    const s2$ = rxjs.of('World');

    const interval$ = rxjs.interval(1000);

    const int1$ = rxjs.interval(1000);
    const int2$ = rxjs.interval(500);

    const timer1$ = rxjs.timer(1000, 2000);
    const timer2$ = rxjs.timer(2000, 2000);
    const timer3$ = rxjs.timer(3000, 2000);

    rxjs.zip(s1$.pipe(delay(2000)), s2$.pipe(delay(5000)))
        .subscribe(createSubscribe('zip'));


    rxjs.zip(
            interval$,
            interval$.pipe(take(3)),
            rxjs.of('String')
        )
        .subscribe(createSubscribe('zip'));

    int1$.pipe(
            withLatestFrom(int2$),
            take(5)
        )
        .subscribe(createSubscribe('withLatestFrom'));

    rxjs.combineLatest(timer1$, timer2$, timer3$)
        .pipe(take(5))
        .subscribe(createSubscribe('combineLatest'));

}

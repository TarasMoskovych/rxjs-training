const streamOperators = () => {
    rxjs.of(5, 4, 5, null, [1, 2, 1])
        .subscribe(createSubscribe('of'));

    rxjs.interval(500)
        .pipe(take(15))
        .subscribe(createSubscribe('interval'));

    rxjs.timer(4000, 500)
        .pipe(take(10))
        .subscribe(createSubscribe('timer'));

    rxjs.range(5, 10)
        .subscribe(createSubscribe('range'));
}

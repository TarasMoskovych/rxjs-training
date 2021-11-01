const selects = () => {
    rxjs.of(1, 5, 'some string', 'last')
        .pipe(first())
        .subscribe(createSubscribe('first'));

    rxjs.of(1, 5, 'some string', 'last string')
        .pipe(last())
        .subscribe(createSubscribe('last'));

    rxjs.of(1, 5, 'some string', 'last string')
        .pipe(find(x => x === 5))
        .subscribe(createSubscribe('find'));

    rxjs.of(1, 5, 'some string', 'last string')
        .pipe(findIndex(x => x === 'some string'))
        .subscribe(createSubscribe('findIndex'));

    rxjs.of(1, 5, 'some string', 'last string')
        .pipe(take(2))
        .subscribe(createSubscribe('take'));

    rxjs.of(1, 5, 'some string', 'last string')
        .pipe(skip(2))
        .subscribe(createSubscribe('skip'));

    rxjs.of(1, 5, 'some string', 'last string')
        .pipe(skipWhile(x => {
            return typeof x === 'number';
        }))
        .subscribe(createSubscribe('skip while'));

    rxjs.interval(500)
        .pipe(skipWhile(x => x < 5))
        .pipe(take(10))
        .subscribe(createSubscribe('skip while'));

    rxjs.interval(500)
        .pipe(takeWhile(x => x < 10))
        .pipe(take(5))
        .subscribe(createSubscribe('take while'));

    rxjs.interval(500)
        .pipe(skipUntil(rxjs.timer(3000)))
        .pipe(takeUntil(rxjs.timer(5000)))
        .subscribe(createSubscribe('take until'));
}

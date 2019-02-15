const utils = () => {
    rxjs.of()
    .pipe(defaultIfEmpty('is empty'))
    .subscribe(createSubscribe('defaultIfEmpty'));

rxjs.from([1, 2, 3, 4, 5, '10'])
    .pipe(every(x => typeof x === 'number'))
    .subscribe(createSubscribe('every'));

rxjs.range(1, 5)
    .pipe(tap(x => console.log(`Before ${x}`)))
    .pipe(map(x => x * x))
    .pipe(tap(x => console.log(`After ${x}`)))
    .subscribe(createSubscribe('tap'));

rxjs.range(1, 5)
    .pipe(map(x => x * x))
    .pipe(delay(1000))
    .subscribe(createSubscribe('delay'));

rxjs.range(1, 5)
    .pipe(map(x => x + 1))
    .pipe(observer => observer.pipe(map(x => x * x))) // pipe - previous let
    .subscribe(createSubscribe('let'));
}

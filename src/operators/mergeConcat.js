const mergeConcat = () => {
    const s1$ = rxjs.of('Hello');
    const s2$ = rxjs.of('World');

    const s1I$ = rxjs.interval(1000).pipe(map(x => `Stream 1: ${x}`));
    const s2I$ = rxjs.interval(500).pipe(map(x => `Stream 2: ${x}`));

    s1$.pipe(merge(s2$))
        .subscribe(createSubscribe('merge operator'));

    rxjs.merge(s1$, s2$)
        .subscribe(createSubscribe('merge'));

    rxjs.merge(s1I$, s2I$)
        .pipe(take(10))
        .subscribe(createSubscribe('merge'));

    rxjs.range(1, 3)
        .pipe(map(() => rxjs.range(1, 3)))
        .pipe(mergeAll())
        .subscribe(createSubscribe('merge all'));

    const s3$ = rxjs.from([0, 1, 2, 3]).pipe(map(x => `Stream 1: ${x}`));
    const s4$ = rxjs.from([4, 5, 6]).pipe(map(x => `Stream 2: ${x}`));

    rxjs.concat(s3$, s4$)
        .subscribe(createSubscribe('concat'));

    rxjs.range(1, 3)
        .pipe(map(x => rxjs.range(x, 3)))
        .pipe(mergeAll())
        .subscribe(createSubscribe('concat all'));
}

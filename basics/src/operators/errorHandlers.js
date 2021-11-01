const errorHandlers = () => {
    const s1$ = rxjs.throwError(new Error('some error'));
    const s2$ = rxjs.interval(500).pipe(take(2));

    rxjs.throwError(new Error('some error'))
        .pipe(catchError(e => {
            return rxjs.of(e);
        }))
        .subscribe(createSubscribe('catch'));

    rxjs.interval(500)
        .pipe(take(2))
        .subscribe(createSubscribe('interval'));

    rxjs.onErrorResumeNext(s1$, s2$)
        .subscribe(createSubscribe('onErrorResumeNext'));
}

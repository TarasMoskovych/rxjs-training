const buffers = () => {
    rxjs.interval(500)
        .pipe(buffer(rxjs.interval(2000)))
        .pipe(take(3))
        .subscribe(createSubscribe('buffer'));

    rxjs.interval(500)
        .pipe(bufferTime(2000))
        .pipe(take(3))
        .subscribe(createSubscribe('buffer time'));

    rxjs.range(0, 50)
        .pipe(bufferCount(10))
        .subscribe(createSubscribe('buffer count'));

    rxjs.interval(1000)
        .pipe(buffer(rxjs.fromEvent(document, 'click')))
        .pipe(map(x => x.length))
        .subscribe(createSubscribe('buffer'));
}

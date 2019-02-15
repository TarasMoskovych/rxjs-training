const mergeMapConcatMap = () => {
    rxjs.of('Hello')
        .subscribe(x => {
            rxjs.of(`${x}, world`)
                .subscribe(createSubscribe('merge map'));
        });

    rxjs.of('Hello')
        .pipe(mergeMap(x => {
            return rxjs.of(`${x}, world`)
        }))
        .subscribe(createSubscribe('merge map'));


    const promise = data => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(data + ' promise.');
            }, 2000);
        });
    };

    rxjs.of('String')
        .pipe(mergeMap(x => {
            return promise(x);
        }))
        .subscribe(createSubscribe('merge map promise'));

    rxjs.range(1, 10)
        .pipe(concatMap((x, i) => {
            return rxjs.interval(100)
                .pipe(
                    take(x),
                    map(q => i)
                );
        }))
        .subscribe(createSubscribe('concat map'));
};

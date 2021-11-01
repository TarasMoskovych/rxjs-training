const mapPluck = () => {
    rxjs.interval(1000)
        .pipe(map(x => Math.pow(x, 2))) // current value modified
        .pipe(take(10))
        .subscribe(createSubscribe('map'));

    rxjs.of('Hello', 'world', 'some string')
        .pipe(map(x => x.toUpperCase()))
        .subscribe(createSubscribe('map'));

    rxjs.fromEvent(document.querySelector('input'), 'keyup')
        .pipe(map(e => e.target.value))
        .pipe(map(str => str.toUpperCase()))
        .pipe(map(str => {
            return {
                text: str,
                length: str.length
            }
        }))
        .subscribe(createSubscribe('map'));

    rxjs.fromEvent(document.querySelector('input'), 'keyup')
        .pipe(pluck('target', 'value'))
        .pipe(map(str => str.toUpperCase()))
        .pipe(map(str => {
            return {
                text: str,
                length: str.length
            }
        }))
        .subscribe(createSubscribe('map'));
}
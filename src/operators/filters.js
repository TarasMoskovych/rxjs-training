const filters = () => {
    const cars = [
        {
            name: 'Audi',
            price: 400
        },
        {
            name: 'BMW',
            price: 600
        },
        {
            name: 'Honda',
            price: 200
        }
    ];

    rxjs.range(0, 10)
        .pipe(filter(x => x % 2 !== 0))
        .subscribe(createSubscribe('filter'));

        rxjs.fromEvent(document.querySelector('input'), 'keyup')
        .pipe(pluck('target', 'value'))
        .subscribe(x => {
            rxjs.from(cars)
                .pipe(filter(car => car.name.toUpperCase() === x.toUpperCase()))
                .subscribe(value => {
                    document.querySelector('h1').innerHTML = `<i>${value.name}</i> ${value.price}`;
                });
        });

    rxjs.fromEvent(document.querySelector('input'), 'keyup')
        .pipe(map(e => e.target.value))
        .pipe(distinct())
        .pipe(debounceTime(250))
        .subscribe(createSubscribe('debounce time'));

    rxjs.from([1, 2, 3, 2, 2, 4, 4, 1, 5, 7])
        .pipe(distinct()) // 1 2 3 4 5 7
        .subscribe(createSubscribe('distinct'));

    rxjs.from([1, 2, 3, 2, 2, 4, 4, 1, 5, 7])
        .pipe(distinctUntilChanged()) // 1 2 3 2 4 1 5 7
        .subscribe(createSubscribe('distinct until changed'));
}

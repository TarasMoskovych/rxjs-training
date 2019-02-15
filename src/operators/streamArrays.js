const streamArrays = () => {
    const set = new Set([1, 2, 3, '4', { id: 6 } ]);
    const map = new Map([ [1,2], [3,4], [5,6] ]);

    rxjs.from([1, 2, 3, 4])
        .subscribe(createSubscribe('from'));

    rxjs.from(set)
        .subscribe(createSubscribe('from'));

    rxjs.from(map)
        .subscribe(createSubscribe('from'));
}

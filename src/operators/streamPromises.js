const streamPromises = () => {
    const delay = (ms = 1000) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('Resolved');
            }, ms);
        });
    }

    delay(3000).then(msg => {
        console.log(msg);
    });

    rxjs.from(delay(4000))
        .subscribe(createSubscribe('from promise'));
}

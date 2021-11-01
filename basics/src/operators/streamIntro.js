const streamIntro = () => {
    const stream$ = rxjs.Observable.create(observer => {
        console.log('Stream was created');

        observer.next('Some string');

        setTimeout(() => {
            observer.complete('After 3 seconds');
        }, 3000);

        setTimeout(() => {
            observer.next('After 5 seconds');
        }, 5000);

        setTimeout(() => {
            observer.error('After 2 seconds: Error');
        }, 2000);

        observer.next('Last');
    });

    stream$
        .subscribe(
            data => {
                console.dir(`Subscribe: ${data}`);
            },
            error => {
                console.log(`Subscribe: ${error}`);
            },
            () => {
                console.log(`Subscribe: Completed`);
            }
        );
}

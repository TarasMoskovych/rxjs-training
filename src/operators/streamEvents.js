const streamEvents = () => {
    const button = document.querySelector('button');
    const btn$ = rxjs.fromEvent(button, 'click');

    const input$ = rxjs.fromEvent(document.querySelector('input'), 'focusout');

    rxjs.fromEvent(document, 'mousemove')
        .subscribe(e => {
            document.querySelector('h1').innerHTML = `X: ${e.clientX}, Y: ${e.clientY}`;
        });

    btn$.subscribe(e => {
        console.log(e);
    });

    input$.subscribe(e => {
        console.log(e);
    });
}

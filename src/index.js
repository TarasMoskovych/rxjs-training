const getUserById = id => {
    const params = {
        access_token: 'af0b1b06ff2e6f54cfc638fdd6f9b3a4377223c7488fadf7126450a852b4e6d5a157006898323f85bb652',
        user_ids: id,
        fields: 'photo_big'
    };

    return $.ajax({
        url: 'https://api.vk.com/method/users.get?v=5.52&' + $.param(params),
        type: 'GET',
        dataType: 'JSONP'
    }).promise();
};

const elements = {
    $img: $('img'),
    $header: $('h1'),
    $input: $('input')
}

rxjs.fromEvent(elements.$input, 'keyup')
    .pipe(
        pluck('target', 'value'),
        distinct(),
        debounceTime(1000),
        mergeMap(val => rxjs.from(getUserById(val))),
        map(user => user.response[0]),
        catchError(error => rxjs.of(error))
    )
    .subscribe(
        user => {
            if (user) {
                elements.$header.html(`${user.first_name} ${user.last_name} <i>${user.id}</i>`);
                elements.$img.attr('src', user.photo_big);
            }
        },
        error => console.log(error),
        () => console.log('Completed')
    )

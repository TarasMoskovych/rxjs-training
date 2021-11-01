const createSubscribe = name => {
    return {
        next(x) {
            console.log(`${name}: ${JSON.stringify(x)}`);
        },
        error(error) {
            console.log(`${name}: ${error}`);
        },
        complete() {
            console.log(`${name}: completed`);
        }
    }
}

const doNTimes = (cb, n) => {
    for(let i = 0; i < n; i++){
        cb();
    }
};

export {doNTimes};
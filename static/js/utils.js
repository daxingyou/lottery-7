function isEmptyObject(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)){
            return false;
        }
    }
    return true;
}

function debounce(fn, delay = 300) {
    let timer;
    return function(...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

function isChinese(text) {
    return /[\u4E00-\u9FA5]+/g.test(text);
}
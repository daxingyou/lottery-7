function isEmptyObject(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

function debounce(fn, delay = 300) {
    let timer;
    return function (...args) {
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

//自定义一个阶乘函数，就是有n个数相乘，从m开始，每个数减1，如factorial(5,4)就是5*(5-1)*(5-2)*(5-3),相乘的数有4个  
function factorial(m, n) {
    var num = 1;
    var count = 0;
    for (var i = m; i > 0; i--) {
        if (count == n) { //当循环次数等于指定的相乘个数时，即跳出for循环  
            break;
        }
        num = num * i;
        count++;
    }
    return num;
}

//自定义组合函数(就是数学排列组合里的C)  
function combination(m, n) {
    return factorial(m, n) / factorial(n, n); //就是Cmn(上面是n，下面是m) = Amn(上面是n，下面是m)/Ann(上下都是n)  
}

//求两个数组的交集
function intersection(a, b) {
    return a.filter(v => b.indexOf(v) !== -1);
}
//求两个数组的无重复并集
function mathUnion(a, b) {
    return [...new Set([...a, ...b])];
}

//求a数组相对于b数组的补集 [1,2,3], [3,4,5] => [1,2]
function difference(a, b) {
    return a.filter(v => b.indexOf(v) === -1);
}
//11选5 n中n 
function nzn11y(s, n) {
    let result = 1;
    for (let i = 0; i < n; i++) {
        result *= (s - i) / (i + 1);
    }
    return result;
}
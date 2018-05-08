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

/**
 * 从一组数字中找出相加等于指定值的合集 3个相加的数字不能都一样
 * 
 * @param {Array} arr 如[0,1,2,3,4,5,6,7,8,9]
 * @param {Number} plusCount 要求相加的数字个数，如1+1+1 则相加的数字是3个 这里3星是3
 * @param {Number} hz 和值 如1+0+2=3,则3为和值
 * 
 */
function choose3mZuxHzCombination(arr, hz) {
    const result1 = []; //有两个号重复
    const result2 = []; //3个号不重复
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            for (let k = 0; k < arr.length; k++) {
                if (arr[i] + arr[j] + arr[k] === hz) {
                    //!((arr[i] === arr[j]) && (arr[j] === arr[k])) 3个相加的数字不能都一样
                    if ([...new Set([arr[i], arr[j], arr[k]])].length === 2) {
                        result1.push([arr[i], arr[j], arr[k]]);
                    } else if ([...new Set([arr[i], arr[j], arr[k]])].length === 3) {
                        result2.push([arr[i], arr[j], arr[k]]);
                    }
                }
            }
        }
    }
    return result1.length / 3 + result2.length / 6; //factorial(3,3)=>6
}

function choose3mZxHzCombination(arr, hz) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            for (let k = 0; k < arr.length; k++) {
                if (arr[i] + arr[j] + arr[k] === hz) {
                    result.push([arr[i], arr[j], arr[k]]);
                }
            }
        }
    }
    return result.length; //factorial(3,3)=>6
}

/**
 * 计算二星跨度株数  arr为选号[0,1,2,3,4,5,6,7,8,9] , num为跨度值
 * 选择一个数值，若所选数值等于开奖号码的前两位数字之差，即为中奖。
 * @param {Array} arr 
 * @param {Number} num 
 */
function calc2mKd(arr, num) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[i] - arr[j] === num) {
                result.push([arr[i], arr[j]]);
            }
        }
    }
    if (num === 0) {
        return result.length;
    }
    return result.length * 2;
}

function calc3mKd(arr, num) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[i] - arr[j] === num) {
                result.push([arr[i], arr[j]]);
            }
        }
    }
    if (num === 0) {
        return result.length;
    }
    let count = 0;
    result.forEach(item=>{
        const restArr = arr.filter(v => v > item[1] && v < item[0]);//最大值的最小值之间可以插入的值
        count += restArr.length * 6;
    });
    return count + result.length * 6;//后面加的是 有两个相同号的情况 如220 133
}
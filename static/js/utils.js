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
//3星直选和值
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
//2星组选和值
function choose2mZuxHzCombination(arr, hz) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[i] + arr[j] === hz) {
                arr[i] !== arr[j] && result.push([arr[i], arr[j]]);
            }
        }
    }
    return result.length / 2; //factorial(2,2)=>2，不考虑顺序要处于这个
}
//2星值选和值
function choose2mZxHzCombination(arr, hz) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[i] + arr[j] === hz) {
                result.push([arr[i], arr[j]]);
            }
        }
    }
    return result.length;
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
//3星跨度
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
    result.forEach(item => {
        const restArr = arr.filter(v => v > item[1] && v < item[0]); //最大值的最小值之间可以插入的值
        count += restArr.length * 6;
    });
    return count + result.length * 6; //后面加的是 有两个相同号的情况 如220 133
}
//3星包胆
function calc3xBaodan(arr, num) {
    const arrLength = arr.length;
    return combination(arrLength - 1, 2) + 　9 * 2; //9是有两个号码相同的情况
}
//2星包胆
function calc2xBaodan(arr, num) {
    const arrLength = arr.length;
    return combination(arrLength - 1, 1) + 　9; //9是有两个号码相同的情况
}
//求数组组合的所有组合方式[1,2,3]->[1,2],[1,3],[2,3]
function choose(arr, size) {
    var allResult = [];

    function _choose(arr, size, result) {
        var arrLen = arr.length;
        if (size > arrLen) {
            return;
        }
        if (size == arrLen) {
            allResult.push([].concat(result, arr))
        } else {
            for (var i = 0; i < arrLen; i++) {
                var newResult = [].concat(result);
                newResult.push(arr[i]);

                if (size == 1) {
                    allResult.push(newResult);
                } else {
                    var newArr = [].concat(arr);
                    newArr.splice(0, i + 　1);
                    _choose(newArr, size - 1, newResult);
                }
            }
        }
    }
    _choose(arr, size, []);

    return allResult;
}
/* 
    数组转成计算每个值重复的个数 的对象
    [1,3,4,5,1] => {
        1:2,
        3:1,
        4:1,
        5:1
    }
*/
function arrToCountItemObj(arr) {
    const obj = Object.create(null);
    for (let item of arr) {
        if (obj[item]) {
            obj[item]++;
        } else {
            obj[item] = 1;
        }
    }
    return obj;
}
// 计算跨度
function calcKd(arr) {
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    return max - min;
}
/* 
计算大小单双
num 选号
flag 大小的比较值 如4 则大于4为大
*/
function calcDx(num, flag) {
    if (num > flag) {
        return '<em class="da">大</em>';
    }
    return '<em class="xiao">小</em>';
}

function calcDs(num) {
    if (num % 2 === 0) {
        return '<em class="dan">双</em>';
    }
    return '<em class="shuang">单</em>';
}
//计算大小的个数
function calcDxgs(arr, flag) {
    const arrLength = arr.length;
    const daCount = arr.filter(num => num > flag).length;
    const xiaoCount = arrLength - daCount;
    return {
        daCount,
        xiaoCount
    };
}
//计算单双个数
function calcDsgs(arr) {
    const arrLength = arr.length;
    const evenCount = arr.filter(num => num % 2 === 0).length;
    const oddCount = arrLength - evenCount;
    return {
        evenCount,
        oddCount
    };
}
/* 
计算龙湖和
前位大于后位为龙；后位大于前位为虎；前位等于后位为和。
*/
function calcLhh(numLeft, numRight) {
    if (numLeft > numRight) {
        return '<em class="long">龙</em>';
    }
    if (numLeft < numRight) {
        return '<em class="hu">虎</em>';
    }
    return '<em class="he">和</em>';
}
//计算顺子 参数，数组范围最小值，范围最大值
function calcShunzi(arr, min = 0, max = 9) {
    arr.sort((a, b) => a - b);
    //如果数组最大值超过设定的最大值max，返回错误提醒
    if (arr[arr.length - 1] > max) {
        throw Error("数组元素最大值超过预期，错误");
        return false;
    }
    const flag = arr.every((m, n) => n == 0 ? true : m - arr[n - 1] == 1 ? true : false);
    if (flag) return true; //如果传进来的数组本身是[2,3,4]这样的连续递增的数据，返回true
    //走到这里，索命传进来的数据不是连续的，那么可以判断没有的数据是不是连续的
    //把1-5这几个元素看成一个圆环，取环上一段连续的数据，那么剩下的数据也必然是连续的
    const arrRest = [];
    //从[1,2,3,4,5]中检测[1,5,2]少了哪些数据
    for (let i = min; i < max + 1; i++) {
        arr.indexOf(i) === -1 && arrRest.push(i);
    }
    //arrRest得到[3,4],然后检测arrRest是不是连续的
    return arrRest.every((t, i) => i == 0 ? true : t - arrRest[i - 1] == 1 ? true : false);
}
//计算杂六
function calcBanshunzi(arr, min = 0, max = 9) {
    if (calcShunzi(arr, min, max)) {
        return false;
    }
    if (arr.indexOf(min) !== -1 && arr.indexOf(max) !== -1) {
        return true;
    }
    arr.sort((a, b) => a - b);
    const reduceArr = [];
    let start = arr[0];
    for (let i = 1; i < arr.length; i++) {
        reduceArr.push(arr[i] - start);
        start = arr[i];
    }
    return reduceArr.indexOf(1) !== -1;
}
/* 
(万位+千位)的和值，取其个位数为庄；
(十位+个位)的和值，取其个位数为闲。
庄大于闲，即押"庄"赢；
庄小于闲，即押"闲"赢；
庄=闲，即押"和"赢；
若万位与千位号码相同，即押"庄对"赢；
若十位与个位号码相同，即押"闲对"赢；
若庄为6，闲小于6，即押"Super6"赢。
*/
function calcBjl(arr) {
    const wan = arr[0];
    const qian = arr[1];
    const shi = arr[2];
    const ge = arr[3];
    const zhuang = (wan + qian) % 10;
    const xian = (shi + ge) % 10;
    let bjlXtPlus = '';
    if (zhuang > xian) {
        if (wan === qian) {
            bjlXtPlus = '<em class="zhuangdui">庄对</em>';
        }
        if (zhuang === 6 && xian < 6) {
            return `<i><em class="s6">S6${bjlXtPlus}</em>`;
        }
        return `<i><em class="zhuang">庄${bjlXtPlus}</em>`;
    }
    if (zhuang < xian) {
        if (shi === shi) {
            bjlXtPlus = '<em class="xiandui">闲对</em>';
        }
        return `<i><em class="xian">闲${bjlXtPlus}</em>`;
    }
    return `<i><em class="he">和</em></i>`;
}
/* 
牛牛：
根据开奖第一球~第五球开出的球号数字为基础，
任意组合三个号码成0或10的倍数，
取剩余两个号码之和为点数（大于10时减去10后的数字作为兑奖基数，如：00026为牛8,02818为牛9，68628、23500皆为牛牛，
26378、15286因任意三个号码都无法组合成0或10的倍数，
称为无牛，注：当五个号码相同时，只有00000视为牛牛，其它11111,66666等皆为无牛）。
大小：牛大（牛6、牛7、牛8、牛9、牛牛），
牛小（牛1、牛2、牛3、牛4、牛5），
若开出斗牛结果为无牛，则投注牛大牛小皆为不中奖。
单双：牛单（牛1、牛3、牛5、牛7、牛9），牛双（牛2、牛4、牛6、牛8、牛牛），
若开出斗牛结果为无牛，
则投注牛单牛双皆为不中奖。
*/
function calcNiuniu(arr) {
    const HZ = arr.reduce((a, b) => a + b);
    const YU = HZ % 10;
    const combinationArr = choose(arr, 3);
    // 是否有 任意组合三个号码成0或10的倍数，
    const has10X = combinationArr.findIndex(a => a.reduce((m, n) => m + n) === 10) !== -1;
    let niuniuXt;
    let dxXt;
    let dsXt;
    if (!has10X) {
        niuniuXt = '<em class="niuniu">无牛</em>';
        dxXt = '---';
        dsXt = '---';
        return `<i style="width:33.33%;">${niuniuXt}</i><i style="width:33.33%;">${dxXt}</i><i style="width:33.33%;">${dsXt}</i>`;
    } else {
        niuniuXt = YU === 0 ? '<em class="niuniu">牛牛</em>' : `<em class="niuniu">牛${YU}</em>`;
        dxXt = [6, 7, 8, 9, 0].indexOf(YU) !== -1 ? '<em class="niuda">牛大</em>' : '<em class="niuda">牛小</em>';
        dsXt = YU % 2 === 0 ? '<em class="niushuang">牛双</em>' : '<em class="niudan">牛单</em>';
    }
    return `<i style="width:33.33%;">${niuniuXt}</i><i style="width:33.33%;">${dxXt}</i><i style="width:33.33%;">${dsXt}</i>`;
}
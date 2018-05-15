import {
    throws
} from "assert";

Vue.component('lottery-trend', {
    template: `
        <div :style="{height: plateHeight}" class="fr lottery-trend-wrap">
            <div class="clearfix lottery-trend-top" ref="lotteryTrendTop">
                <span class="fl lottery-trend-title">近30期开奖结果</span>
                <span class="fr lottery-trend-link">
                    <i class="lottery-trend-icon"></i>完整走势图
                </span>
            </div>
            <div class="lottery-trend-head" ref="lotteryTrendHead">
                <span :style="{width: trendColWidth}" class="trend-head-col trend-col-1">期号</span>
                <span :style="{width: trendColWidth}" class="trend-head-col trend-col-2">开奖号码</span>
                <span :style="{width: trendColWidth}" class="trend-head-col trend-col-3" v-if="trendXtTitle" v-html="trendXtTitle"></span>
            </div>
            <div class="lottery-trend-body">
                <div class="lottery-trend-item" v-for="(item, index) in trendData">
                    <span :style="{width: trendColWidth}" class="trend-col trend-col-1">{{item.issueNo}}</span>
                    <span :style="{width: trendColWidth}" class="trend-col trend-col-2" v-html="renderCode(item.code)"></span>
                    <span :style="{width: trendColWidth}" class="trend-col trend-col-3" v-if="trendXtTitle" v-html="renderXt(item.code)"></span>
                </div>
            </div>
        </div>
    `,
    props: ['trend-data'],
    data() {
        return {
            trendXtTitleConfig: {
                'wx_zx_fs': '五星组态',
                'wx_zx_ds': '五星组态',
                'wx_zx_zh': '五星组态',
                'wx_zux_z120': '五星组态',
                'wx_zux_z60': '五星组态',
                'wx_zux_z30': '五星组态',
                'wx_zux_z20': '五星组态',
                'wx_zux_z10': '五星组态',
                'wx_zux_z5': '五星组态',
                'sx_zx_fs': '四星组态',
                'sx_zx_ds': '四星组态',
                'sx_zx_zh': '四星组态',
                'sx_zux_z24': '四星组态',
                'sx_zux_z12': '四星组态',
                'sx_zux_z6': '四星组态',
                'sx_zux_z4': '四星组态',
                'qsm_zx_fs': '前三组态',
                'qsm_zx_ds': '前三组态',
                'qsm_zx_hz': '直选和值',
                'qsm_zx_kd': '直选跨度',
                'qsm_zux_z3': '前三组态',
                'qsm_zux_z6': '前三组态',
                'qsm_zux_hh': '前三组态',
                'qsm_zux_bd': '前三组态',
                'qsm_zux_hz': '组选和值',
                'zsm_zx_fs': '中三组态',
                'zsm_zx_ds': '中三组态',
                'zsm_zx_hz': '直选和值',
                'zsm_zx_kd': '直选跨度',
                'zsm_zux_z3': '中三组态',
                'zsm_zux_z6': '中三组态',
                'zsm_zux_hh': '中三组态',
                'zsm_zux_bd': '中三组态',
                'zsm_zux_hz': '组选和值',
                'hsm_zx_fs': '后三组态',
                'hsm_zx_ds': '后三组态',
                'hsm_zx_hz': '直选和值',
                'hsm_zx_kd': '直选跨度',
                'hsm_zux_z3': '后三组态',
                'hsm_zux_z6': '后三组态',
                'hsm_zux_hh': '后三组态',
                'hsm_zux_bd': '后三组态',
                'hsm_zux_hz': '组选和值',
                'qem_zx_fs': '直选和值',
                'qem_zx_ds': '直选和值',
                'qem_zx_hz': '直选和值',
                'qem_zx_kd': '直选跨度',
                'qem_zux_fs': '组选和值',
                'qem_zux_ds': '组选和值',
                'qem_zux_hz': '组选和值',
                'qem_zux_bd': '组选和值',
                'hem_zx_fs': '直选和值',
                'hem_zx_ds': '直选和值',
                'hem_zx_hz': '直选和值',
                'hem_zx_kd': '直选跨度',
                'hem_zux_fs': '组选和值',
                'hem_zux_ds': '组选和值',
                'hem_zux_hz': '组选和值',
                'hem_zux_bd': '组选和值',
                'dxds_dxds_h2': '<i style="width:50%;">十位</i><i style="width:50%;">个位</i>',
                'dxds_dxds_q2': '<i style="width:50%;">万位</i><i style="width:50%;">千位</i>',
                'dxds_dxds_h3': '<i style="width:33.33%;">百位</i><i style="width:33.33%;">十位</i><i style="width:33.33%;">个位</i>',
                'dxds_dxds_q3': '<i style="width:33.33%;">万位</i><i style="width:33.33%;">千位</i><i style="width:33.33%;">百位</i>',
                'dxds_hzdxds_5xhz': '<i style="width:33.33%;">和值</i><i style="width:33.33%;">大小</i><i style="width:33.33%;">单双</i>',
                'dxds_hzdxds_q3hz': '<i style="width:33.33%;">和值</i><i style="width:33.33%;">大小</i><i style="width:33.33%;">单双</i>',
                'dxds_hzdxds_z3hz': '<i style="width:33.33%;">和值</i><i style="width:33.33%;">大小</i><i style="width:33.33%;">单双</i>',
                'dxds_hzdxds_h3hz': '<i style="width:33.33%;">和值</i><i style="width:33.33%;">大小</i><i style="width:33.33%;">单双</i>',
                'dxds_dxgs_h3': '<i style="width:50%;">大</i><i style="width:50%;">小</i>',
                'dxds_dxgs_z3': '<i style="width:50%;">大</i><i style="width:50%;">小</i>',
                'dxds_dxgs_q3': '<i style="width:50%;">大</i><i style="width:50%;">小</i>',
                'dxds_dxgs_wx': '<i style="width:50%;">大</i><i style="width:50%;">小</i>',
                'dxds_dxgs_sx': '<i style="width:50%;">大</i><i style="width:50%;">小</i>',
                'dxds_dsgs_h3': '<i style="width:50%;">单</i><i style="width:50%;">双</i>',
                'dxds_dsgs_z3': '<i style="width:50%;">单</i><i style="width:50%;">双</i>',
                'dxds_dsgs_q3': '<i style="width:50%;">单</i><i style="width:50%;">双</i>',
                'dxds_dsgs_wx': '<i style="width:50%;">单</i><i style="width:50%;">双</i>',
                'dxds_dsgs_sx': '<i style="width:50%;">单</i><i style="width:50%;">双</i>',
                'qw_lhh_wq': '万千',
                'qw_lhh_wb': '万百',
                'qw_lhh_ws': '万十',
                'qw_lhh_wg': '万个',
                'qw_lhh_qb': '千百',
                'qw_lhh_qs': '千十',
                'qw_lhh_qg': '千个',
                'qw_lhh_bs': '百十',
                'qw_lhh_bg': '百个',
                'qw_lhh_sg': '十个',
                'qw_xt_wx': '五星形态',
                'qw_xt_q3': '前三形态',
                'qw_xt_z3': '中三形态',
                'qw_xt_h3': '后三形态',
                'qw_ts_sjfc': '五星组态',
                'qw_ts_sxbx': '五星组态',
                'qw_ts_hscs': '五星组态',
                'qw_ts_yffs': '五星组态',
                'qw_bjl_bjl': '百家乐',
                'nn_nn_nn': '<i style="width:33.33%;">牛牛</i><i style="width:33.33%;">大小</i><i style="width:33.33%;">单双</i>',
            },
        };
    },
    beforeCreate() {},
    created() {

    },
    beforeMount() {},
    mounted() {

    },
    computed: {
        plateHeight() {
            return store.state.plateHeight;
        },
        method() {
            return store.state.method;
        },
        trendXtTitle() {
            return this.trendXtTitleConfig[this.method];
        },
        trendColWidth() {
            if (this.trendXtTitle) {
                return '33.33%';
            }
            return '50%';
        },
        getTrendNumAddColorPos() { //中间号码是否加颜色配置 key表示位置 012345对应万千百十个
            //五星玩法
            if (/^wx_/.test(this.method)) {
                return '01234';
            }
            //四星玩法
            if (/^sx_/.test(this.method)) {
                return '0123';
            }
            if (/^qsm_/.test(this.method)) {
                return '012';
            }
            if (/^zsm_/.test(this.method)) {
                return '123';
            }
            if (/^hsm_/.test(this.method)) {
                return '234';
            }
            if (/^qem_/.test(this.method)) {
                return '01';
            }
            if (/^hem_/.test(this.method)) {
                return '34';
            }
            //定位胆
            if (/^dwd_/.test(this.method)) {
                return '01234';
            }
            //不定胆
            if (['bdd_bdd3_q31', 'bdd_bdd3_q32'].indexOf(this.method) !== -1) {
                return '012';
            }
            if (['bdd_bdd3_z31', 'bdd_bdd3_z32'].indexOf(this.method) !== -1) {
                return '123';
            }
            if (['bdd_bdd3_h31', 'bdd_bdd3_h32'].indexOf(this.method) !== -1) {
                return '234';
            }
            if (/^bdd_bdd4/.test(this.method)) {
                return '0123';
            }
            if (/^bdd_bdd5/.test(this.method)) {
                return '01234';
            }
            //大小单双
            if (/^dxds/.test(this.method)) {
                if (/_q2$/.test(this.method)) {
                    return '01';
                }
                if (/_h2$/.test(this.method)) {
                    return '34';
                }
                if (/_h3$/.test(this.method)) {
                    return '234';
                }
                if (/_q3$/.test(this.method)) {
                    return '012';
                }
                if (/_z3$/.test(this.method)) {
                    return '123';
                }
                if (/_q3hz$/.test(this.method)) {
                    return '012';
                }
                if (/_z3hz$/.test(this.method)) {
                    return '123';
                }
                if (/_h3hz$/.test(this.method)) {
                    return '234';
                }
                if (/_5xhz$/.test(this.method)) {
                    return '01234';
                }
                if (/_wx$/.test(this.method)) {
                    return '01234';
                }
                if (/_sx$/.test(this.method)) {
                    return '0123';
                }
            }
            //趣味
            if (/^qw/.test(this.method)) {
                //龙虎和
                if (/^qw_lhh/.test(this.method)) {
                    const lhhConfig = {
                        'qw_lhh_wq': '01',
                        'qw_lhh_wb': '02',
                        'qw_lhh_ws': '03',
                        'qw_lhh_wg': '04',
                        'qw_lhh_qb': '12',
                        'qw_lhh_qs': '13',
                        'qw_lhh_qg': '14',
                        'qw_lhh_bs': '23',
                        'qw_lhh_bg': '24',
                        'qw_lhh_sg': '34',
                    };
                    return lhhConfig[this.method];
                }
                //形态
                if (/^qw_xt/.test(this.method)) {
                    const xtConfig = {
                        'qw_xt_wx': '01234',
                        'qw_xt_q3': '012',
                        'qw_xt_z3': '123',
                        'qw_xt_h3': '234'
                    };
                    return xtConfig[this.method];
                }
                //特殊
                if (/^qw_ts/.test(this.method)) {
                    return '01234';
                }
                //百家乐
                if (/^qw_bjl_bjl$/.test(this.method)) {
                    return '0134';
                }
            }
            //牛牛
            if (/^nn_nn_nn$/.test(this.method)) {
                return '01234';
            }
            //任选
            if (/^rx\d*/.test(this.method)) {
                return '01234';
            }
        }
    },
    watch: {},
    methods: {
        renderCode(code) {
            const trendNumAddColorPos = this.getTrendNumAddColorPos;
            return code.split(',').map((num, index) => {
                if (trendNumAddColorPos.includes(String(index))) {
                    return `<i class="trend-num trend-num-on">${num}</i>`;
                }
                return `<i class="trend-num">${num}</i>`;
            }).join('');
        },
        renderXt(code) {
            const trendNumAddColorPos = this.getTrendNumAddColorPos;
            let codeArr = code.split(',').map(v => Number(v));
            //过滤出着色的号码 因为走势只根据着色的号码来 
            codeArr = codeArr.filter((num, index) => trendNumAddColorPos.includes(String(index)));
            const countItemObj = arrToCountItemObj(codeArr);
            const countItemObjValues = Object.values(countItemObj);
            const countItemObjKeys = Object.keys(countItemObj);
            const HZ = codeArr.reduce((a, b) => a + b); //和值
            const KD = calcKd(codeArr);
            switch (this.trendXtTitle) {
                case '五星组态':
                    if (countItemObjValues.length === 5) { // 1 1 1 1 1
                        return '组120';
                    }
                    if (countItemObjValues.length === 4) { //2 1 1 1 2重号 单号
                        return '组60';
                    }
                    if (countItemObjValues.length === 3) {
                        if (countItemObjKeys.includes(3)) { //3 1 1 3重号 单号
                            return '组20';
                        }
                        if (countItemObjKeys.includes(2)) { // 2 2 1 2重号 单号
                            return '组30';
                        }
                    }
                    if (countItemObjValues.length === 2) {
                        if (countItemObjKeys.includes(4)) { //4 1  4重号 单号
                            return '组5';
                        }
                        if (countItemObjKeys.includes(2)) { // 3 2  3重号 2重号
                            return '组10';
                        }
                    }
                    break;
                case '四星组态':
                    if (countItemObjValues.length === 4) { // 1 1 1 1 
                        return '组24';
                    }
                    if (countItemObjValues.length === 3) { //2 1 1  2重号 单号
                        return '组12';
                    }
                    if (countItemObjValues.length === 2) {
                        if (countItemObjKeys.includes(3)) { //3 1  3重号 单号
                            return '组4';
                        }
                        if (countItemObjKeys.includes(2)) { // 2 2  2重号 
                            return '组6';
                        }
                    }
                    break;
                case '前三组态':
                case '中三组态':
                case '后三组态':
                    if (countItemObjValues.length === 2) {
                        return '组三';
                    }
                    if (countItemObjValues.length === 1) {
                        return '组六';
                    }
                    break;
                case '直选和值':
                case '组选和值':
                    return HZ;
                    break;
                case '直选跨度':
                    return KD;
                    break;
                case '<i style="width:50%;">十位</i><i style="width:50%;">个位</i>':
                case '<i style="width:50%;">万位</i><i style="width:50%;">千位</i>':
                    return `<i style="width:50%;">${calcDx(codeArr[0], 4)}${calcDs(codeArr[0])}</i><i style="width:50%;">${calcDx(codeArr[1], 4)}${calcDs(codeArr[1])}</i>`;
                    break;
                case '<i style="width:33.33%;">百位</i><i style="width:33.33%;">十位</i><i style="width:33.33%;">个位</i>':
                case '<i style="width:33.33%;">万位</i><i style="width:33.33%;">千位</i><i style="width:33.33%;">百位</i>':
                    return `<i style="width:33.33%;">${calcDx(codeArr[0], 4)}${calcDs(codeArr[0])}</i><i style="width:33.33%;">${calcDx(codeArr[1], 4)}${calcDs(codeArr[1])}</i><i style="width:33.33%;">${calcDx(codeArr[2])}${calcDs(codeArr[2])}</i>`;
                    break;
                case '<i style="width:33.33%;">和值</i><i style="width:33.33%;">大小</i><i style="width:33.33%;">单双</i>':
                case '<i style="width:33.33%;">和值</i><i style="width:33.33%;">大小</i><i style="width:33.33%;">单双</i>':
                case '<i style="width:33.33%;">和值</i><i style="width:33.33%;">大小</i><i style="width:33.33%;">单双</i>':
                case '<i style="width:33.33%;">和值</i><i style="width:33.33%;">大小</i><i style="width:33.33%;">单双</i>':
                    return `<i style="width:33.33%;">${HZ}</i><i style="width:33.33%;">${calcDx(HZ, 22)}</i><i style="width:33.33%;">${calcDs(HZ)}</i>`;
                    break;
                case '<i style="width:50%;">大</i><i style="width:50%;">小</i>':
                    return `<i style="width:50%;">${calcDxgs(codeArr, 4).daCount}</i><i style="width:50%;">${calcDxgs(codeArr, 4).xiaoCount}</i>`;
                    break;
                case '<i style="width:50%;">单</i><i style="width:50%;">双</i>':
                    return `<i style="width:50%;">${calcDsgs(codeArr).oddCount}</i><i style="width:50%;">${calcDsgs(codeArr).evenCount}</i>`;
                    break;
                case '万千':
                case '万百':
                case '万十':
                case '万个':
                case '千百':
                case '千十':
                case '千个':
                case '百十':
                case '百个':
                case '十个':
                    return `${calcLhh(codeArr[0], codeArr[1])}`;
                    break;
                case '五星形态':
                    if (countItemObjValues.length === 5) { // 1 1 1 1 1 顺子 单牌
                        if (calcShunzi(codeArr)) {
                            return '顺子';
                        }
                        return '单牌';
                    }
                    if (countItemObjValues.length === 4) { //2 1 1 1 2重号 单号
                        return '一对';
                    }
                    if (countItemObjValues.length === 3) {
                        if (countItemObjKeys.includes(3)) { //3 1 1 3重号 单号
                            return '三条';
                        }
                        if (countItemObjKeys.includes(2)) { // 2 2 1 2重号 单号
                            return '两对';
                        }
                    }
                    if (countItemObjValues.length === 2) {
                        if (countItemObjKeys.includes(4)) { //4 1  4重号 单号
                            return '四条';
                        }
                        if (countItemObjKeys.includes(2)) { // 3 2  3重号 2重号
                            return '葫芦';
                        }
                    }
                    break;
                case '前三形态':
                case '中三形态':
                case '后三形态':
                    if (countItemObjValues.length === 3) { //杂六 顺子 半顺
                        if (calcShunzi(codeArr)) {
                            return '顺子';
                        }
                        if (calcBanshunzi(codeArr)) {
                            return '半顺';
                        }
                        return '杂六';
                    }
                    if (countItemObjValues.length === 2) {
                        return '对子';
                    }
                    if (countItemObjValues.length === 1) {
                        return '豹子';
                    }
                    break;
                default:
                    break;
            }
        }
    }
});
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
        if (obj.item) {
            obj.item++;
        } else {
            obj.item = 1;
        }
    }
    return obj;
}
// 计算跨度
function calcKd(arr) {
    const max = Math.max(...arr);
    const min = Math.min(...min);
    return max - min;
}
/* 
计算大小单双
num 选号
flag 大小的比较值 如4 则大于4为大
*/
function calcDx(num, flag) {
    if (num > flag) {
        return '大';
    }
    return '小';
}

function calcDs(num) {
    if (num % 2 === 0) {
        return '双';
    }
    return '单';
}
//计算大小的个数
function calcDxgs(arr, flag) {
    const arrLength = arr.length;
    const daCount = arr.filter(num => num > flag).length;
    const xiaoCount = arrLength - DaCount;
    return {
        daCount,
        xiaoCount
    };
}
//计算单双个数
function calcDsgs(arr) {
    const arrLength = arr.length;
    const evenCount = arr.filter(num => num % 2 === 0).length;
    const oddCount = arrLength - DaCount;
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
        return '龙';
    }
    if (numLeft < numRight) {
        return '虎';
    }
    return '和';
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
    if (calcShunzi(arr, min = 0, max = 9)) {
        return false;
    }
    if (arr.indexOf(0) !== -1 && arr.indexOf(9) !== -1) {
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
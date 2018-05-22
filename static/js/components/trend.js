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
                <span :style="{width: trendColWidth.left}" class="trend-head-col trend-col-1">期号</span>
                <span :style="{width: trendColWidth.center}" class="trend-head-col trend-col-2">开奖号码</span>
                <span :style="{width: trendColWidth.right}" class="trend-head-col trend-col-3" v-if="trendXtTitle" v-html="trendXtTitle"></span>
            </div>
            <div class="lottery-trend-body">
                <div class="lottery-trend-item" v-for="(item, index) in trendData">
                    <span :style="{width: trendColWidth.left}" class="trend-col trend-col-1">{{item.issueNo}}</span>
                    <span :style="{width: trendColWidth.center}" class="trend-col trend-col-2" v-html="renderCode(item.code)"></span>
                    <span :style="{width: trendColWidth.right}" class="trend-col trend-col-3" v-if="trendXtTitle" v-html="renderXt(item.code)"></span>
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
    created() {},
    beforeMount() {},
    mounted() {},
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
                if (this.method === 'nn_nn_nn') {
                    return {
                        left: '30%',
                        center: '30%',
                        right: '40%'                    
                    };
                }
                return {
                    left: '33.33%',
                    center: '33.33%',
                    right: '33.33%'                    
                };
            }
            return {
                left: '50%',
                center: '50%'                    
            };
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
                        return '<em class="z120">组120</em>';
                    }
                    if (countItemObjValues.length === 4) { //2 1 1 1 2重号 单号
                        return '<em class="z60">组60</em>';
                    }
                    if (countItemObjValues.length === 3) {
                        if (countItemObjValues.includes(3)) { //3 1 1 3重号 单号
                            return '<em class="z20">组20</em>';
                        }
                        if (countItemObjValues.includes(2)) { // 2 2 1 2重号 单号
                            return '<em class="z30">组30</em>';
                        }
                    }
                    if (countItemObjValues.length === 2) {
                        if (countItemObjValues.includes(4)) { //4 1  4重号 单号
                            return '<em class="z5">组5</em>';
                        }
                        if (countItemObjValues.includes(2)) { // 3 2  3重号 2重号
                            return '<em class="z10">组10</em>';
                        }
                    }
                    break;
                case '四星组态':
                    if (countItemObjValues.length === 4) { // 1 1 1 1 
                        return '<em class="z24">组24</em>';
                    }
                    if (countItemObjValues.length === 3) { //2 1 1  2重号 单号
                        return '<em class="z12">组12</em>';
                    }
                    if (countItemObjValues.length === 2) {
                        if (countItemObjValues.includes(3)) { //3 1  3重号 单号
                            return '<em class="z4">组4</em>';
                        }
                        if (countItemObjValues.includes(2)) { // 2 2  2重号 
                            return '<em class="z6">组6</em>';
                        }
                    }
                    break;
                case '前三组态':
                case '中三组态':
                case '后三组态':
                    if (countItemObjValues.length === 2) {
                        return '<em class="z3">组三</em>';
                    }
                    if (countItemObjValues.length === 3) {
                        return '<em class="z6">组六</em>';
                    }
                    return '---';
                    break;
                case '直选和值':
                case '组选和值':
                    return `<em class="hz">${HZ}</em>`;
                    break;
                case '直选跨度':
                    return `<em class="kd">${KD}</em>`;
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
                    return `<i style="width:33.33%;"><em class="hz">${HZ}</em></i><i style="width:33.33%;">${calcDx(HZ, 22)}</i><i style="width:33.33%;">${calcDs(HZ)}</i>`;
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
                            return '<em class="shunzi">顺子</em>';
                        }
                        return '<em class="danpai">单牌</em>';
                    }
                    if (countItemObjValues.length === 4) { //2 1 1 1 2重号 单号
                        return '<em class="yidui">一对</em>';
                    }
                    if (countItemObjValues.length === 3) {
                        if (countItemObjValues.includes(3)) { //3 1 1 3重号 单号
                            return '<em class="santiao">三条</em>';
                        }
                        if (countItemObjValues.includes(2)) { // 2 2 1 2重号 单号
                            return '<em class="liangdui">两对</em>';
                        }
                    }
                    if (countItemObjValues.length === 2) {
                        if (countItemObjValues.includes(4)) { //4 1  4重号 单号
                            return '<em class="sitiao">四条</em>';
                        }
                        if (countItemObjValues.includes(2)) { // 3 2  3重号 2重号
                            return '<em class="hulu">葫芦</em>';
                        }
                    }
                    break;
                case '前三形态':
                case '中三形态':
                case '后三形态':
                    if (countItemObjValues.length === 3) { //杂六 顺子 半顺
                        if (calcShunzi(codeArr)) {
                            return '<em class="shunzi">顺子</em>';
                        }
                        if (calcBanshunzi(codeArr)) {
                            return '<em class="banshun">半顺</em>';
                        }
                        return '<em class="za6">杂六</em>';
                    }
                    if (countItemObjValues.length === 2) {
                        return '<em class="duizi">对子</em>';
                    }
                    if (countItemObjValues.length === 1) {
                        return '<em class="baozi">豹子</em>';
                    }
                    break;
                case '百家乐':
                    return calcBjl(codeArr);
                    break;
                case '<i style="width:33.33%;">牛牛</i><i style="width:33.33%;">大小</i><i style="width:33.33%;">单双</i>':
                    return calcNiuniu(codeArr);
                    break;
                default:
                    break;
            }
        }
    }
});

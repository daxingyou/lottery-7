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
                'qw_ts_sjfc': '五星形态',
                'qw_ts_sxbx': '五星形态',
                'qw_ts_hscs': '五星形态',
                'qw_ts_yffs': '五星形态',
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
                return '01234';
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
                if (/_5x$/.test(this.method)) {
                    return '01234';
                }
                if (/_4x$/.test(this.method)) {
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
                //牛牛
                if (/^nn_nn_nn$/.test(this.method)) {
                    return '0134';
                }
                //任选
                if (/^rx\d*/.test(this.method)) {
                    return '01234';
                }
            }
        }
    },
    watch: {},
    methods: {
        renderCode(code) {
            const trendNumAddColorPos = this.getTrendNumAddColorPos();
            return code.split(',').map((num, index) => {
                if (trendNumAddColorPos.includes(String(index))) {
                    return `<i class="trend-num trend-num-on">${num}</i>`;
                }
                return `<i class="trend-num">${num}</i>`;
            });
        },
        renderXt() {
            return '组20';
        }
    }
});
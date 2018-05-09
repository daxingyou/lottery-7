Vue.component('lottery-plate', {
    template: `
        <div class="lottery-plate-wrap">
            <div class="plate-tab clearfix" v-if="normalTabFlag === 'normal'">
                <span class="plate-tab-item fl" :key="key" :class="{on: currentTab === key}" v-for="(value,key,index) in lotteryConfig['ltNormalTab']" :tab="key" @click="switchTab(key)">
                    {{value}}
                </span>
                <span class="plate-tab-item-more fr" @click="changeNormalTabFlag('rx')">任选玩法<i class="plate-tab-item-more-icon"></i></span>
            </div>
            <div class="plate-tab clearfix" v-if="normalTabFlag === 'rx'">
                <span class="plate-tab-item fl" :key="key" :class="{on: currentTab === key}" v-for="(value,key,index) in lotteryConfig['ltRxTab']" :tab="key" @click="switchTab(key)">
                    {{value}}
                </span>
                <span class="plate-tab-item-more fr" @click="changeNormalTabFlag('normal')">常规玩法<i class="plate-tab-item-more-icon"></i></span>
            </div>
            <div class="plate-sub-tab">
                <div class="sub-tab-wrap" v-for="(subTabObj,middleCode) in lotteryConfig['ltMethod'][currentTab]">
                    <span class="sub-tab-title" :class="{'sub-tab-dxds-title': currentTab === 'dxds'}">{{subTabObj.title}}:</span>
                    <span class="sub-tab-item" :class="{on: currentSubTab === middleCode + '_' + key,'sub-tab-dxds-item': currentTab === 'dxds'}" v-for="(obj,key) in subTabObj['method']" @click="switchSubTab(middleCode + '_' + key)">{{obj.desc}}</span>
                </div>
            </div>
            <div class="plate-number" :tab="currentTab" :sub-tab="currentSubTab" :mid-method="methodArr[1]">
                <div class="plate-number-top clearfix">
                    <span class="plate-method-hint fl">{{methodCnName}}<i class="question-mark-icon" :title="methodHint"></i></span>
                    <span class="hot-miss-tab fl">
                        <span class="miss-tab on">遗漏</span>
                        <span class="hot-tab">冷热</span>
                        <i class="question-mark-icon" title="遗漏：表示该号码从上次开出至今，有多少期未出现；冷热：表示在最近100期开奖中，该号码在对应的位置上出现的次数"></i>
                    </span>
                </div>
                <div class="plate-number-list">
                    <div v-if="plateType === 'number'" class="plate-number-item clearfix" v-for="(plateNumObj,index) in plateNumArr">
                        <span class="plate-number-position fl" :class="{'plate-number-position-all': plateNumObj.position === '所有位置'}">{{plateNumObj.position}}</span>
                        <div class="clearfix fl select-number-wrap">
                            <span class="plate-number-each fl" :class="{on: plateOrderObj[plateNumObj.position]&&plateOrderObj[plateNumObj.position][num], 'two-chinese': isChinese(num) && num.length === 2}" v-for="(num,numIndex) in plateNumObj.num" @click="selectNum(plateNumObj.position,num)">{{num}}</span>
                        </div>
                        <span class="plate-filter-button fr" v-if="plateNumObj.filterArr.length > 0">
                            <i class="filter-button" v-for="value in plateNumObj.filterArr" @click="filterNum(plateNumObj, value)">{{value}}</i>
                        </span>
                    </div>
                    <div v-if="plateType === 'input'" class="ds-input-box">
                        <div v-if="normalTabFlag === 'rx'" class="input-pos">
                            <span>选择位置</span>
                            <label v-for="(pos, index) in inputPosObj" :class="{on: pos.status}" @click="toggleInputPosStatus(index)">{{[pos.text]}}</label>
                            <span class="pos-tip">注意：此处默认选择所有位置，请您自行调整。</span>
                        </div>
                        <div class="ds-input-area">
                            <ul class="clearfix">
                                <li class="fl ds-input-item" v-for="(value,index) in dsInputNums">
                                    {{value}}
                                    <i class="ds-input-delete" @click="dsDelete(index)" title="点击删除选号">x</i>
                                </li>
                            </ul>
                            <textarea class="ds-input" v-model="dsInputValue" :placeholder="methodHint" @input="pushDsValue"></textarea>
                        </div>
                        <span class="input-upload-btn">上传文件</span>
                        <span class="input-clear-btn">清空</span>
                    </div>
                </div>
            </div>
            <div class="plate-bottom">
                <div class="clearfix plate-number-bottom-top">
                    <div class="clearfix fl">
                        <span :class="{on: modelValue === model.value}" class="fl model-item" v-for="model in modelArr" @click="switchModel(model)">{{model.text}}</span>
                    </div>
                    <div class="fl number-minus-plus-outter">
                        <number-minus-plus :default-times="1" @receive-times="receiveTimes"></number-minus-plus>
                    </div>
                    <div class="fl clearfix number-odd-wrap">
                        <i class="fl number-odd-text">奖金</i>
                        <select class="fl number-odd-select" v-model="selectedOdd">
                            <option :odd="odd" :point="point">{{odd + '~' + point * 100 + '%'}}</option>
                        </select>
                    </div>
                </div>
                <div class="clearfix plate-numbet-bottom-bottom">
                    <span :class="{disabled: addNumberDisabled}" class="fr add-number" @click="addOrder">添加选号</span>
                    <span :class="{disabled: quickBetDisabled}" class="fr quick-bet">快速投注</span>
                    <span class="fr totals-wrap">
                        <span class="total-bet-wrap">已选<i class="total-bet margin-0-2">{{totalBet}}</i>注，</span><span class="total-times-wrap">共<i class="total-times margin-0-2">{{totalTimes}}</i>倍，</span><span class="total-money-wrap">共计<i class="total-money margin-0-2">{{totalMoney}}</i>元</span>
                    </span>
                </div>
            </div>
        </div>
    `,
    props: ['lottery-config', 'lottery-type', 'lottery-code', 'model-arr'],
    data() {
        return {
            normalTabFlag: localStorage.getItem(`${this.lotteryCode}-normalTabFlag`) || 'normal',
            currentTab: '',
            currentSubTab: '',
            plateType: '', //input 单式，number 选号盘
            positionArr: [], //万千宝石个
            inputPosObj: { //任选单式的位置0,1,2,3,4 =》万千百十个 true表示默认选中
                0: {
                    text: '万',
                    status: true
                },
                1: {
                    text: '千',
                    status: true
                },
                2: {
                    text: '百',
                    status: true
                },
                3: {
                    text: '十',
                    status: true
                },
                4: {
                    text: '个',
                    status: true
                }
            },
            dsInputNums: [], //单式输入的数字数组
            dsInputValue: '',
            plateOrderObj: {},
            lotteryTip: {},
            selectedOdd: '',
            numberTimes: 1,
            oddsObj: {},
            modelValue: 2, //倍数
            totalBet: 0, //总注数
        };
    },
    beforeCreate() {},
    created() {
        this.ajaxLotteryTip();
        this.getCurrentTab();
        this.getCurrentSubTab();
        this.ajaxOdds();
    },
    beforeMount() {},
    mounted() {
        this.switchTab(this.currentTab);
    },
    computed: {
        totalTimes() { //总倍数
            return this.numberTimes;
        },
        totalMoney() { //总金额
            return this.modelValue * this.totalTimes * this.totalBet;
        },
        quickBetDisabled() {
            return this.totalBet === 0;
        },
        addNumberDisabled() {
            return this.totalBet === 0;
        },
        firstTab() {
            if (this.normalTabFlag === 'normal') {
                return Object.keys(this.lotteryConfig['ltNormalTab'])[0];
            } else if (this.normalTabFlag === 'rx') {
                return Object.keys(this.lotteryConfig['ltRxTab'])[0];
            }
        },
        firstSubTab() {
            const firstMiddleCode = Object.keys(this.lotteryConfig['ltMethod'][this.currentTab])[0]; //获取'wx_zx_fs'中的zx值
            const firstLastCode = Object.keys(this.lotteryConfig['ltMethod'][this.currentTab][firstMiddleCode]['method'])[0]; //获取fs
            return `${firstMiddleCode}_${firstLastCode}`;
        },
        method() {
            store.commit('getMethod', `${this.currentTab}_${this.currentSubTab}`);
            return `${this.currentTab}_${this.currentSubTab}`;
        },
        methodArr() {
            return this.method.split('_');
        },
        methodHint() {
            return this.lotteryTip[this.method] && this.lotteryTip[this.method].paraphrase;
        },
        methodCnName() {
            const methodArr = this.method.split('_');
            return this.lotteryConfig.ltMethod[methodArr[0]][methodArr[1]].method[methodArr[2]].name;
        },
        plateNumArr() { //渲染选号盘的数据，包括万千百十个位置和选号
            const resultArr = [];
            if (this.currentTab && this.currentSubTab) {
                const middleCode = this.currentSubTab.split('_')[0];
                const lastCode = this.currentSubTab.split('_')[1];
                const obj = this.lotteryConfig['ltMethod'][this.currentTab][middleCode]['method'][lastCode];
                const numArr = obj.num.split('|'); //"千位,百位,十位,个位|0-9|all" => ["千位,百位,十位,个位","0-9","all"]
                if (numArr[0] === 'input') {
                    this.plateType = 'input';
                    return;
                } else {
                    this.plateType = 'number'; //获取data中 plateType
                }
                const positionArr = numArr[0].split(',');
                this.positionArr = positionArr; //获取data中 positionArr的值
                let selectNumRangeArr;
                if (/^\d+-\d+$/.test(numArr[1])) { //配置表中位是 0-9这种
                    const selectNumArr = numArr[1].split('-'); //"0-9" => ['0','9']
                    selectNumRangeArr = this.$range(selectNumArr[0], selectNumArr[1]); //['0','9'] => [0,1,2,3,4,5,6,7,8,9]
                } else if (/^(?:[\u4e00-\u9fa5a-zA-Z0-9]+,)*(?:[\u4e00-\u9fa5a-zA-Z0-9]+)$/g.test(numArr[1])) { //配置表中位是 “大，小，单，双” 这种
                    selectNumRangeArr = numArr[1].split(',');
                }
                const filter = numArr[2];
                let filterArr;
                switch (filter) {
                    case 'all':
                        filterArr = ['全', '大', '小', '奇', '偶', '清'];
                        break;
                    case 'two':
                        filterArr = ['全', '清'];
                        break;
                    default:
                        filterArr = [];
                        break;
                }
                positionArr.forEach(position => {
                    resultArr.push({
                        position,
                        filterArr,
                        num: selectNumRangeArr
                    });
                });
            }
            return resultArr;
        },
        odd() {
            return this.oddsObj && this.oddsObj[this.method] && this.oddsObj[this.method].odds;
        },
        'odd-x' () {
            return this.oddsObj && this.oddsObj[this.method] && this.oddsObj[this.method].x;
        },
        'odd-y' () {
            return this.oddsObj && this.oddsObj[this.method] && this.oddsObj[this.method].y;
        },
        point() {
            return this.oddsObj && this.oddsObj[this.method] && this.oddsObj[this.method].point;
        }
    },
    watch: {
        plateOrderObj: { //非单式株数
            handler(newVal, oldVal) {
                let initValue;
                let posArr = Object.keys(this.plateOrderObj);
                switch (this.method) {
                    case 'wx_zx_fs':
                    case 'sx_zx_fs':
                    case 'qsm_zx_fs':
                    case 'zsm_zx_fs':
                    case 'hsm_zx_fs':
                    case 'qem_zx_fs':
                    case 'hem_zx_fs':
                    case 'dxds_dxds_h2':
                    case 'dxds_dxds_q2':
                    case 'dxds_dxds_h3':
                    case 'dxds_dxds_q3':
                        initValue = 1;
                        if (this.positionArr.length === posArr.length / 2) { //每个位置都有选号才计算, /2 是因为加了个valueChange属性
                            for (pos in this.plateOrderObj) {
                                if (pos.indexOf('valueChange') !== -1) continue; //加了个valueChange触发监听，这边要过滤掉
                                initValue = initValue * this.plateOrderObj[pos].selected.length;
                            }
                            if (initValue >= 1) {
                                this.totalBet = initValue;
                            } else {
                                this.totalBet = 0;
                            }
                        } else {
                            this.totalBet = 0;
                        }
                        break;
                    case 'dwd_dwd_dwd':
                        initValue = 0;
                        for (pos in this.plateOrderObj) {
                            if (pos.indexOf('valueChange') !== -1) continue; //加了个valueChange触发监听，这边要过滤掉
                            initValue += this.plateOrderObj[pos].selected.length;
                        }
                        if (initValue >= 1) {
                            this.totalBet = initValue;
                        } else {
                            this.totalBet = 0;
                        }
                        break;
                    case 'wx_zx_zh':
                    case 'sx_zx_zh':
                        initValue = 1;
                        if (this.positionArr.length === posArr.length / 2) { //每个位置都有选号才计算, /2 是因为加了个valueChange属性
                            for (let pos in this.plateOrderObj) {
                                if (pos.indexOf('valueChange') !== -1) continue; //加了个valueChange触发监听，这边要过滤掉
                                initValue = initValue * this.plateOrderObj[pos].selected.length;
                            }
                            initValue = initValue * this.positionArr.length;
                            if (initValue > 1) {
                                this.totalBet = initValue;
                            } else {
                                this.totalBet = 0;
                            }
                        } else {
                            this.totalBet = 0;
                        }
                        break;
                    case 'wx_zux_z120':
                        initValue = 0;
                        if (this.positionArr.length === posArr.length / 2) { //每个位置都有选号才计算, /2 是因为加了个valueChange属性
                            const arr = this.plateOrderObj['组选120'].selected;
                            initValue = combination(arr.length, 5); //一行号码里面取5个Cm5
                        }
                        if (initValue >= 1) {
                            this.totalBet = initValue;
                        } else {
                            this.totalBet = 0;
                        }
                        break;
                    case 'sx_zux_z24':
                    case 'rx4_zux_z24':
                        initValue = 0;
                        if (this.positionArr.length === posArr.length / 2) { //每个位置都有选号才计算, /2 是因为加了个valueChange属性
                            const arr = this.plateOrderObj['组24'].selected;
                            initValue = combination(arr.length, 4); //一行号码里面取4个Cm5
                        }
                        if (initValue >= 1) {
                            this.totalBet = initValue;
                        } else {
                            this.totalBet = 0;
                        }
                        if (this.normalTabFlag === 'rx') {
                            const selectedPosArr = this.inputPosObj.filter(item => item.status);
                            if (selectedPosArr.length >= 4) {
                                this.totalBet = this.totalBet * combination(selectedPosArr, 4);
                            } else {
                                this.totalBet = 0;
                            }
                        }
                        break;
                    case 'sx_zux_z6':
                    case 'rx4_zux_z6':
                        initValue = 0;
                        if (this.positionArr.length === posArr.length / 2) { //每个位置都有选号才计算, /2 是因为加了个valueChange属性
                            const arr = this.plateOrderObj['二重号'].selected;
                            initValue = combination(arr.length, 2); //2个二重号
                        }
                        if (initValue >= 1) {
                            this.totalBet = initValue;
                        } else {
                            this.totalBet = 0;
                        }
                        if (this.normalTabFlag === 'rx') {
                            const selectedPosArr = this.inputPosObj.filter(item => item.status);
                            if (selectedPosArr.length >= 4) {
                                this.totalBet = this.totalBet * combination(selectedPosArr, 4);
                            } else {
                                this.totalBet = 0;
                            }
                        }
                        break;
                    case 'qsm_zux_z6':
                    case 'zsm_zux_z6':
                    case 'hsm_zux_z6':
                    case 'rx3_zux_z6':
                        initValue = 0;
                        if (this.positionArr.length === posArr.length / 2) { //每个位置都有选号才计算, /2 是因为加了个valueChange属性
                            const arr = this.plateOrderObj['组六'].selected;
                            initValue = combination(arr.length, 3); //从0-9中选择3个号码组成一注
                        }
                        if (initValue >= 1) {
                            this.totalBet = initValue;
                        } else {
                            this.totalBet = 0;
                        }
                        if (this.normalTabFlag === 'rx') {
                            const selectedPosArr = this.inputPosObj.filter(item => item.status);
                            if (selectedPosArr.length >= 3) {
                                this.totalBet = this.totalBet * combination(selectedPosArr, 3);
                            } else {
                                this.totalBet = 0;
                            }
                        }
                        break;
                    case 'qsm_zux_z3':
                    case 'zsm_zux_z3':
                    case 'hsm_zux_z3':
                    case 'rx3_zux_z3':
                        initValue = 0;
                        if (this.positionArr.length === posArr.length / 2) { //每个位置都有选号才计算, /2 是因为加了个valueChange属性
                            const arr = this.plateOrderObj['组三'].selected;
                            initValue = 2 * combination(arr.length, 2); //从0-9中选择2个号码组成两注
                        }
                        if (initValue >= 1) {
                            this.totalBet = initValue;
                        } else {
                            this.totalBet = 0;
                        }
                        if (this.normalTabFlag === 'rx') {
                            const selectedPosArr = this.inputPosObj.filter(item => item.status);
                            if (selectedPosArr.length >= 3) {
                                this.totalBet = this.totalBet * combination(selectedPosArr, 3);
                            } else {
                                this.totalBet = 0;
                            }
                        }
                        break;
                    case 'wx_zux_z60':
                        initValue = 0;
                        if (this.positionArr.length === posArr.length / 2) { //每个位置都有选号才计算, /2 是因为加了个valueChange属性
                            const arr1 = this.plateOrderObj['二重号'].selected;
                            const arr2 = this.plateOrderObj['单号'].selected;
                            arr1.forEach(v => {
                                const diffArr = difference([v], arr2);
                                initValue += combination(diffArr.length, 3); //1个二重号，3个单号
                            });
                        }
                        if (initValue >= 1) {
                            this.totalBet = initValue;
                        } else {
                            this.totalBet = 0;
                        }
                        break;
                    case 'sx_zux_z12':
                    case 'rx4_zux_z12':
                        initValue = 0;
                        if (this.positionArr.length === posArr.length / 2) { //每个位置都有选号才计算, /2 是因为加了个valueChange属性
                            const arr1 = this.plateOrderObj['二重号'].selected;
                            const arr2 = this.plateOrderObj['单号'].selected;
                            arr1.forEach(v => {
                                const diffArr = difference([v], arr2);
                                initValue += combination(diffArr.length, 2); //1个二重号，2个单号
                            });
                        }
                        if (initValue >= 1) {
                            this.totalBet = initValue;
                        } else {
                            this.totalBet = 0;
                        }
                        if (this.normalTabFlag === 'rx') {
                            const selectedPosArr = this.inputPosObj.filter(item => item.status);
                            if (selectedPosArr.length >= 4) {
                                this.totalBet = this.totalBet * combination(selectedPosArr, 4);
                            } else {
                                this.totalBet = 0;
                            }
                        }
                        break;
                    case 'wx_zux_z30':
                        initValue = 0;
                        if (this.positionArr.length === posArr.length / 2) { //每个位置都有选号才计算, /2 是因为加了个valueChange属性
                            const arr1 = this.plateOrderObj['二重号'].selected;
                            const arr2 = this.plateOrderObj['单号'].selected;
                            arr2.forEach(v => {
                                const diffArr = difference([v], arr1);
                                initValue += combination(diffArr.length, 2); //2个二重号，1个单号
                            });
                        }
                        if (initValue >= 1) {
                            this.totalBet = initValue;
                        } else {
                            this.totalBet = 0;
                        }
                        break;
                    case 'wx_zux_z20':
                        initValue = 0;
                        if (this.positionArr.length === posArr.length / 2) { //每个位置都有选号才计算, /2 是因为加了个valueChange属性
                            const arr1 = this.plateOrderObj['三重号'].selected;
                            const arr2 = this.plateOrderObj['单号'].selected;
                            arr1.forEach(v => {
                                const diffArr = difference([v], arr2);
                                initValue += combination(diffArr.length, 2); //1个3重号，2个单号
                            });
                        }
                        if (initValue >= 1) {
                            this.totalBet = initValue;
                        } else {
                            this.totalBet = 0;
                        }
                        break;
                    case 'wx_zux_z10':
                        initValue = 0;
                        if (this.positionArr.length === posArr.length / 2) { //每个位置都有选号才计算, /2 是因为加了个valueChange属性
                            const arr1 = this.plateOrderObj['三重号'].selected;
                            const arr2 = this.plateOrderObj['二重号'].selected;
                            arr1.forEach(v => {
                                const diffArr = difference([v], arr2);
                                initValue += combination(diffArr.length, 1); //1个3重号，1个二重号
                            });
                        }
                        if (initValue >= 1) {
                            this.totalBet = initValue;
                        } else {
                            this.totalBet = 0;
                        }
                        break;
                    case 'wx_zux_z5':
                        initValue = 0;
                        if (this.positionArr.length === posArr.length / 2) { //每个位置都有选号才计算, /2 是因为加了个valueChange属性
                            const arr1 = this.plateOrderObj['四重号'].selected;
                            const arr2 = this.plateOrderObj['单号'].selected;
                            arr1.forEach(v => {
                                const diffArr = difference([v], arr2);
                                initValue += combination(diffArr.length, 1); //1个4重号，1个单号
                            });
                        }
                        if (initValue >= 1) {
                            this.totalBet = initValue;
                        } else {
                            this.totalBet = 0;
                        }
                        break;
                    case 'sx_zux_z4':
                    case 'rx4_zux_z4':
                        initValue = 0;
                        if (this.positionArr.length === posArr.length / 2) { //每个位置都有选号才计算, /2 是因为加了个valueChange属性
                            const arr1 = this.plateOrderObj['三重号'].selected;
                            const arr2 = this.plateOrderObj['单号'].selected;
                            arr1.forEach(v => {
                                const diffArr = difference([v], arr2);
                                initValue += combination(diffArr.length, 1); //1个3重号，1个单号
                            });
                        }
                        if (initValue >= 1) {
                            this.totalBet = initValue;
                        } else {
                            this.totalBet = 0;
                        }
                        if (this.normalTabFlag === 'rx') {
                            const selectedPosArr = this.inputPosObj.filter(item => item.status);
                            if (selectedPosArr.length >= 4) {
                                this.totalBet = this.totalBet * combination(selectedPosArr, 4);
                            } else {
                                this.totalBet = 0;
                            }
                        }
                        break;
                    case 'qsm_zux_hz':
                    case 'zsm_zux_hz':
                    case 'hsm_zux_hz':
                    case 'rx3_zux_hz':
                    case 'rx3_zux_hz':
                    case 'rx3_zux_hz':
                        initValue = 0;
                        if (this.positionArr.length === posArr.length / 2) { //每个位置都有选号才计算, /2 是因为加了个valueChange属性
                            const _pos = this.positionArr[0]; //这几个玩法只有一个位置                                                        
                            const arr = this.plateOrderObj[_pos].selected;
                            arr.forEach(v => {
                                initValue += choose3mZuxHzCombination([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], v);
                            });
                        }
                        if (initValue >= 1) {
                            this.totalBet = initValue;
                        } else {
                            this.totalBet = 0;
                        }
                        if (this.normalTabFlag === 'rx') {
                            const selectedPosArr = this.inputPosObj.filter(item => item.status);
                            if (selectedPosArr.length >= 3) {
                                this.totalBet = this.totalBet * combination(selectedPosArr, 3);
                            } else {
                                this.totalBet = 0;
                            }
                        }
                        break;
                    case 'qem_zux_hz':
                    case 'zem_zux_hz':
                    case 'hem_zux_hz':
                    case 'rx2_zux_hz':
                    case 'rx2_zux_hz':
                    case 'rx2_zux_hz':
                        initValue = 0;
                        if (this.positionArr.length === posArr.length / 2) { //每个位置都有选号才计算, /2 是因为加了个valueChange属性
                            const _pos = this.positionArr[0]; //这几个玩法只有一个位置                                                        
                            const arr = this.plateOrderObj[_pos].selected;
                            arr.forEach(v => {
                                initValue += choose2mZuxHzCombination([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], v);
                            });
                        }
                        if (initValue >= 1) {
                            this.totalBet = initValue;
                        } else {
                            this.totalBet = 0;
                        }
                        if (this.normalTabFlag === 'rx') {
                            const selectedPosArr = this.inputPosObj.filter(item => item.status);
                            this.totalBet = this.totalBet * combination(selectedPosArr, 2);
                        }
                        break;
                    case 'qsm_zx_hz':
                    case 'zsm_zx_hz':
                    case 'hsm_zx_hz':
                    case 'rx3_zx_hz':
                    case 'rx3_zx_hz':
                    case 'rx3_zx_hz':
                        initValue = 0;
                        if (this.positionArr.length === posArr.length / 2) { //每个位置都有选号才计算, /2 是因为加了个valueChange属性
                            const _pos = this.positionArr[0]; //这几个玩法只有一个位置                            
                            const arr = this.plateOrderObj[_pos].selected;
                            arr.forEach(v => {
                                initValue += choose3mZxHzCombination([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], v);
                            });
                        }
                        if (initValue >= 1) {
                            this.totalBet = initValue;
                        } else {
                            this.totalBet = 0;
                        }
                        if (this.normalTabFlag === 'rx') {
                            const selectedPosArr = this.inputPosObj.filter(item => item.status);
                            this.totalBet = this.totalBet * combination(selectedPosArr, 3);
                        }
                        break;
                    case 'qem_zx_hz':
                    case 'zem_zx_hz':
                    case 'hem_zx_hz':
                    case 'rx2_zx_hz':
                    case 'rx2_zx_hz':
                    case 'rx2_zx_hz':
                        initValue = 0;
                        if (this.positionArr.length === posArr.length / 2) { //每个位置都有选号才计算, /2 是因为加了个valueChange属性
                            const _pos = this.positionArr[0]; //这几个玩法只有一个位置                            
                            const arr = this.plateOrderObj[_pos].selected;
                            arr.forEach(v => {
                                initValue += choose3mZxHzCombination([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], v);
                            });
                        }
                        if (initValue >= 1) {
                            this.totalBet = initValue;
                        } else {
                            this.totalBet = 0;
                        }
                        if (this.normalTabFlag === 'rx') {
                            const selectedPosArr = this.inputPosObj.filter(item => item.status);
                            this.totalBet = this.totalBet * combination(selectedPosArr, 2);
                        }
                        break;
                    case 'qsm_zx_kd':
                    case 'zsm_zx_kd':
                    case 'hsm_zx_kd':
                        initValue = 0;
                        if (this.positionArr.length === posArr.length / 2) { //每个位置都有选号才计算, /2 是因为加了个valueChange属性
                            const _pos = this.positionArr[0]; //这几个玩法只有一个位置
                            const arr = this.plateOrderObj[_pos].selected;
                            arr.forEach(v => {
                                initValue += calc3mKd([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], v);
                            });
                        }
                        if (initValue >= 1) {
                            this.totalBet = initValue;
                        } else {
                            this.totalBet = 0;
                        }
                        break;
                    case 'qem_zx_kd':
                    case 'zem_zx_kd':
                    case 'hem_zx_kd':
                        initValue = 0;
                        if (this.positionArr.length === posArr.length / 2) { //每个位置都有选号才计算, /2 是因为加了个valueChange属性
                            const _pos = this.positionArr[0]; //这几个玩法只有一个位置
                            const arr = this.plateOrderObj[_pos].selected;
                            arr.forEach(v => {
                                initValue += calc2mKd([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], v);
                            });
                        }
                        if (initValue >= 1) {
                            this.totalBet = initValue;
                        } else {
                            this.totalBet = 0;
                        }
                        break;
                    case 'qsm_zx_bd':
                    case 'zsm_zx_bd':
                    case 'hsm_zx_bd':
                        initValue = 0;
                        if (this.positionArr.length === posArr.length / 2) { //每个位置都有选号才计算, /2 是因为加了个valueChange属性
                            const _pos = this.positionArr[0]; //这几个玩法只有一个位置
                            const arr = this.plateOrderObj[_pos].selected;
                            arr.forEach(v => {
                                initValue += calc3xBaodan([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], v);
                            });
                        }
                        if (initValue >= 1) {
                            this.totalBet = initValue;
                        } else {
                            this.totalBet = 0;
                        }
                        break;
                    case 'qem_zx_bd':
                    case 'zem_zx_bd':
                    case 'hem_zx_bd':
                        initValue = 0;
                        if (this.positionArr.length === posArr.length / 2) { //每个位置都有选号才计算, /2 是因为加了个valueChange属性
                            const _pos = this.positionArr[0]; //这几个玩法只有一个位置
                            const arr = this.plateOrderObj[_pos].selected;
                            arr.forEach(v => {
                                initValue += calc2xBaodan([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], v);
                            });
                        }
                        if (initValue >= 1) {
                            this.totalBet = initValue;
                        } else {
                            this.totalBet = 0;
                        }
                        break;
                    case 'bdd_bdd3_q31':
                    case 'bdd_bdd3_q32':
                    case 'bdd_bdd3_z31':
                    case 'bdd_bdd3_z32':
                    case 'bdd_bdd3_h31':
                    case 'bdd_bdd3_h32':
                    case 'bdd_bdd4_sx1':
                    case 'bdd_bdd4_sx2':
                    case 'bdd_bdd4_sx3':
                    case 'bdd_bdd5_wx1':
                    case 'bdd_bdd5_wx2':
                    case 'bdd_bdd5_wx3':
                        if (this.positionArr.length === posArr.length / 2) { //每个位置都有选号才计算, /2 是因为加了个valueChange属性
                            const _pos = this.positionArr[0]; //这几个玩法只有一个位置
                            const n = Number(this.method.slice(-1));
                            const arr = this.plateOrderObj[_pos].selected;
                            initValue = combination(arr.length, n);
                        }
                        if (initValue >= 1) {
                            this.totalBet = initValue;
                        } else {
                            this.totalBet = 0;
                        }
                        break;
                    case 'dxds_hzdxds_wxhz':
                    case 'dxds_hzdxds_h3hz':
                    case 'dxds_hzdxds_q3hz':
                    case 'dxds_hzdxds_z3hz':
                    case 'dxds_dsgs_wx':
                    case 'dxds_dsgs_sx':
                    case 'dxds_dsgs_q3':
                    case 'dxds_dsgs_z3':
                    case 'dxds_dsgs_h3':
                    case 'dxds_dxgs_wx':
                    case 'dxds_dxgs_sx':
                    case 'dxds_dxgs_q3':
                    case 'dxds_dxgs_z3':
                    case 'dxds_dxgs_h3':
                    case 'qw_lhh_wq':
                    case 'qw_lhh_wb':
                    case 'qw_lhh_ws':
                    case 'qw_lhh_wg':
                    case 'qw_lhh_qb':
                    case 'qw_lhh_qs':
                    case 'qw_lhh_qg':
                    case 'qw_lhh_bs':
                    case 'qw_lhh_bg':
                    case 'qw_lhh_sg':
                    case 'qw_xt_wx':
                    case 'qw_xt_q3':
                    case 'qw_xt_h3':
                    case 'qw_xt_z3':
                    case 'qw_ts_yffs':
                    case 'qw_ts_hscs':
                    case 'qw_ts_sxbx':
                    case 'qw_ts_sjfc':
                    case 'qw_bjl_bjl':
                    case 'nn_nn_nn':
                        if (this.positionArr.length === posArr.length / 2) { //每个位置都有选号才计算, /2 是因为加了个valueChange属性
                            const _pos = this.positionArr[0]; //这几个玩法只有一个位置
                            const arr = this.plateOrderObj[_pos].selected;
                            initValue = arr.length;
                        }
                        if (initValue >= 1) {
                            this.totalBet = initValue;
                        } else {
                            this.totalBet = 0;
                        }
                        break;
                    case 'rx2_zx_fs':
                        initValue = 0;
                        const _arrRx2 = []; //记录每个位置选中号码个数的合集
                        this.positionArr.forEach(_pos => {
                            this.plateOrderObj[_pos].selected = this.plateOrderObj[_pos].selected || [];
                            _arrRx2.push(this.plateOrderObj[_pos].selected.length);
                        });
                        //任选2即 选出两个位置 两两相乘
                        const copyArr = _arrRx2.slice();
                        _arrRx2.forEach(() => {
                            const firstItem = copyArr.shift();
                            copyArr.forEach(v => {
                                initValue += firstItem * v;
                            });
                        });
                        if (initValue >= 1) {
                            this.totalBet = initValue;
                        } else {
                            this.totalBet = 0;
                        }
                        break;
                    case 'rx3_zx_fs':
                    case 'rx4_zx_fs':
                        initValue = 0;
                        const _arrRx = []; //记录每个位置选中号码个数的合集
                        this.positionArr.forEach(_pos => {
                            this.plateOrderObj[_pos].selected = this.plateOrderObj[_pos].selected || [];
                            _arrRx.push(this.plateOrderObj[_pos].selected.length);
                        });
                        const size = this.method.match(/rx(\d)_/)[1];
                        //求数组组合的所有组合方式[1,2,3]->[1,2],[1,3],[2,3]
                        const chooseArr = choose(_arrRx, size);
                        chooseArr.forEach(itemArr => {
                            initValue += itemArr.reduce((a, b) => a * b);
                        });
                        if (initValue >= 1) {
                            this.totalBet = initValue;
                        } else {
                            this.totalBet = 0;
                        }
                        break;
                    case 'qem_zux_fs':
                    case 'hem_zux_fs':
                    case 'rx2_zux_fs':
                        if (this.positionArr.length === posArr.length / 2) { //每个位置都有选号才计算, /2 是因为加了个valueChange属性
                            const _pos = this.positionArr[0]; //这几个玩法只有一个位置
                            const arr = this.plateOrderObj[_pos].selected;
                            initValue = combination(arr.length, 2);
                        }
                        if (initValue >= 1) {
                            this.totalBet = initValue;
                        } else {
                            this.totalBet = 0;
                        }
                        if (this.normalTabFlag === 'rx') {
                            const selectedPosArr = this.inputPosObj.filter(item => item.status);
                            if (selectedPosArr.length >= 2) {
                                this.totalBet = this.totalBet * combination(selectedPosArr, 2);
                            } else {
                                this.totalBet = 0;
                            }
                        }
                        break;
                    default:
                        break;
                }
            },
            deep: true,
        },
        dsInputNums: { //单式株数
            handler(newVal, oldVal) {
                switch (this.currentSubTab) {
                    case 'zx_ds':
                    case 'zux_ds':
                    case 'zux_hh':
                        if (this.normalTabFlag === 'normal') {
                            this.totalBet = this.dsInputNums.length;
                        } else if (this.normalTabFlag === 'rx') {
                            const selectedPosArr = this.inputPosObj.filter(item => item.status);
                            const size = this.method.match(/rx(\d)_/)[1];
                            if (selectedPosArr.length >= size) {
                                this.totalBet = this.dsInputNums.length * combination(selectedPosArr.length, size);
                            } else {
                                this.totalBet = 0;
                            }
                        }
                        break;
                    default:
                        break;
                }
            },
            deep: true
        }
    },
    methods: {
        receiveTimes(msg) { //倍数
            this.numberTimes = msg;
            console.log(msg)
        },
        ajaxOdds() {
            this.$http.get(`/json/${this.lotteryCode.toLocaleLowerCase()}-odds.json`).then(res => {
                this.oddsObj = res.data.result[this.lotteryCode];
                this.selectedOdd = `${this.oddsObj[this.method].odds}~${this.oddsObj[this.method].point*100}%`;
            });
        },
        ajaxLotteryTip() {
            this.$http.get(`/json/${this.lotteryType}-tip.json`).then(res => {
                this.lotteryTip = res.data;
            });
        },
        getCurrentTab() {
            this.currentTab = localStorage.getItem(`${this.lotteryCode}-${this.normalTabFlag}-currentTab`) || this.firstTab;
        },
        getCurrentSubTab() {
            this.currentSubTab = this.firstSubTab;
        },
        changeNormalTabFlag(tabFlag) {
            this.normalTabFlag = tabFlag;
            localStorage.setItem(`${this.lotteryCode}-normalTabFlag`, tabFlag);
            this.getCurrentTab();
            this.switchTab(this.currentTab);
        },
        switchTab(tab) {
            localStorage.setItem(`${this.lotteryCode}-${this.normalTabFlag}-currentTab`, tab);
            this.currentTab = tab;
            this.getCurrentSubTab();
            this.switchSubTab(this.currentSubTab);
        },
        switchSubTab(subTab) {
            this.currentSubTab = subTab;
            this.dsInputNums = [];
            this.plateOrderObj = {};
        },
        toggleInputPosStatus(index) {
            this.inputPosObj[index].status = !this.inputPosObj[index].status;
        },
        dsDelete(index) { //单式删除选号
            this.dsInputNums.splice(index, 1);
        },
        pushDsValue() { //单式输号
            debounce(() => { //校验格式 
                //号码可重复，如111
                const regExpObj = {
                    'ssc': /^\d+$/g,
                    'match-ssc': /\d/g,
                    '3d': /^\d+$/g,
                    'match-3d': /\d/g,
                    'ky481': /^[1-8]+$/g,
                    'match-ky481': /[1-8]/g,
                    'pk10': /^(?:0[1-9]|1[0])+$/g, // 01 - 10                    
                    'match-pk10': /(0[1-9]|1[0])/g, // 01 - 10                    
                    '11y': /^(?:0[1-9]|1[0-1])+$/g, // 01 - 11
                    'match-11y': /(0[1-9]|1[0-1])/g, // 01 - 11
                    'kl12': /^(?:0[1-9]|1[0-2])+$/g, // 01 - 12
                    'match-kl12': /(0[1-9]|1[0-2])/g, // 01 - 12                    
                };
                this.dsInputValue = this.dsInputValue.replace(/\D/g, ''); //只允许输入数字
                //zux_hh组选混合玩法不包含豹子号111 /^(?:0[1-9]|1[0-2])+$/.test("0122")
                if (['ssc', 'ky481', '3d'].indexOf(this.lotteryType) !== -1) {
                    if (!regExpObj[this.lotteryType].test(this.dsInputValue)) {
                        return;
                    }
                    const dsInputValueArr = this.dsInputValue.match(regExpObj[`match-${this.lotteryType}`]); //123=>[1,2,3]
                    if (this.currentSubTab === 'zux_hh' || this.currentSubTab === 'zux_ds') { //选号不能全部相同，不限顺序
                        if ([...new Set[dsInputValueArr]].length === 1) { //说明是豹子号
                            return;
                        }
                        //不能有两组数字相同的选号
                        const findSame = this.dsInputNums.find(num => {
                            const numString = num.match(regExpObj[`match-${this.lotteryType}`]).sort().toString();
                            const dsInputValueString = dsInputValueArr.sort().toString();
                            if (numString === dsInputValueString) {
                                return true;
                            }
                        });
                        if (findSame) {
                            return;
                        }
                    }
                    switch (this.currentTab) { //根据玩法控制输入数字位数
                        case 'wx':
                            if (dsInputValueArr.length === 5) {
                                this.dsInputNums.indexOf(this.dsInputValue) === -1 && this.dsInputNums.push(this.dsInputValue);
                                this.dsInputValue = '';
                            }
                            break;
                        case 'sx':
                            if (dsInputValueArr.length === 4) {
                                this.dsInputNums.indexOf(this.dsInputValue) === -1 && this.dsInputNums.push(this.dsInputValue);
                                this.dsInputValue = '';
                            }
                            break;
                        case 'sm':
                        case 'qsm':
                        case 'zsm':
                        case 'hsm':
                            if (dsInputValueArr.length === 3) {
                                this.dsInputNums.indexOf(this.dsInputValue) === -1 && this.dsInputNums.push(this.dsInputValue);
                                this.dsInputValue = '';
                            }
                            break;
                        case 'em':
                            if (dsInputValueArr.length === 2) {
                                this.dsInputNums.indexOf(this.dsInputValue) === -1 && this.dsInputNums.push(this.dsInputValue);
                                this.dsInputValue = '';
                            }
                            break;
                        default:
                            break;
                    }
                    return;
                }
                //11选5等玩法的输入规则是010203,号码不重复 "010203".match(/\d{2}/g);
                if (['11y', 'kl12', 'pk10'].indexOf(this.lotteryType) !== -1) {
                    if (!regExpObj[this.lotteryType].test(this.dsInputValue)) {
                        return;
                    }
                    const dsInputValueArr = this.dsInputValue.match(regExpObj[`match-${this.lotteryType}`]); //123=>[1,2,3]
                    if (this.currentSubTab === 'zux_hh') {
                        if ([...new Set[dsInputValueArr]].length !== dsInputValueArr.length) { //说明有重复号
                            return;
                        }
                    }
                    switch (this.currentTab) { //根据玩法控制输入数字位数
                        case 'wx':
                        case 'cq5':
                            if (dsInputValueArr.length === 5) {
                                this.dsInputNums.indexOf(this.dsInputValue) === -1 && this.dsInputNums.push(this.dsInputValue);
                                this.dsInputValue = '';
                            }
                            break;
                        case 'sx':
                        case 'cq4':
                            if (dsInputValueArr.length === 4) {
                                this.dsInputNums.indexOf(this.dsInputValue) === -1 && this.dsInputNums.push(this.dsInputValue);
                                this.dsInputValue = '';
                            }
                            break;
                        case 'sm':
                        case 'cq3':
                            if (dsInputValueArr.length === 3) {
                                this.dsInputNums.indexOf(this.dsInputValue) === -1 && this.dsInputNums.push(this.dsInputValue);
                                this.dsInputValue = '';
                            }
                            break;
                        case 'em':
                        case 'cq2':
                            if (dsInputValueArr.length === 2) {
                                this.dsInputNums.indexOf(this.dsInputValue) === -1 && this.dsInputNums.push(this.dsInputValue);
                                this.dsInputValue = '';
                            }
                            break;
                        default:
                            break;
                    }
                    this.dsInputValue = '';
                    return;
                }
            })();
        },
        selectNum(pos, num) {
            if (pos === '所有位置') {
                //所有位置逻辑
                this.plateOrderObj[pos] = this.plateOrderObj[pos] || {};
                this.plateOrderObj[pos][num] = !this.plateOrderObj[pos][num];
                for (let i = 0; i < this.plateNumArr.length - 1; i++) { //this.plateNumArr.length - 1 减1是因为最后1位是 所有位置 自身，不用遍历
                    const _pos = this.plateNumArr[i].position;
                    this.plateOrderObj[_pos] = this.plateOrderObj[_pos] || {};
                    this.plateOrderObj[_pos].selected = this.plateOrderObj[_pos].selected || [];
                    this.plateOrderObj[_pos][num] = this.plateOrderObj[pos][num];
                    if (this.plateOrderObj[_pos][num]) {
                        this.plateOrderObj[_pos].selected.push(num);
                    } else {
                        const index = this.plateOrderObj[_pos].selected.indexOf(num);
                        if (index !== -1) {
                            this.plateOrderObj[_pos].selected.splice(index, 1);
                        }
                    }
                    this.$set(this.plateOrderObj, `valueChange-${_pos}`, Math.random()); //触发监听，vue不能监听增加删除属性，用这个方法才能触发                            
                }
                this.$forceUpdate();
                return;
            }
            this.plateOrderObj[pos] = this.plateOrderObj[pos] || {};
            this.plateOrderObj[pos].selected = this.plateOrderObj[pos].selected || [];
            this.plateOrderObj[pos][num] = !this.plateOrderObj[pos][num];
            if (this.plateOrderObj[pos][num]) {
                this.plateOrderObj[pos].selected.push(num);
            } else {
                const index = this.plateOrderObj[pos].selected.indexOf(num);
                if (index !== -1) {
                    this.plateOrderObj[pos].selected.splice(index, 1);
                }
            }
            this.$set(this.plateOrderObj, `valueChange-${pos}`, Math.random()); //触发监听，vue不能监听增加删除属性，用这个方法才能触发                        
            this.$forceUpdate();
        },
        switchModel(model) {
            this.modelValue = model.value;
        },
        filterNum(plateNumObj, value) { //过滤 全大小奇偶清
            this.plateOrderObj[plateNumObj.position] = this.plateOrderObj[plateNumObj.position] || {};
            this.plateOrderObj[plateNumObj.position].selected = this.plateOrderObj[plateNumObj.position].selected || [];
            switch (value) {
                case '全':
                    plateNumObj.num.forEach(num => {
                        this.plateOrderObj[plateNumObj.position][num] = true;
                        !this.plateOrderObj[plateNumObj.position].selected.includes(num) && this.plateOrderObj[plateNumObj.position].selected.push(num);
                    });
                    break;
                case '大':
                    plateNumObj.num.forEach((num, index, arr) => {
                        if (num < arr.length / 2) {
                            this.plateOrderObj[plateNumObj.position][num] = false;
                            const index = this.plateOrderObj[plateNumObj.position].selected.indexOf(num);
                            index !== -1 && this.plateOrderObj[plateNumObj.position].selected.splice(index, 1);
                        } else {
                            this.plateOrderObj[plateNumObj.position][num] = true;
                            !this.plateOrderObj[plateNumObj.position].selected.includes(num) && this.plateOrderObj[plateNumObj.position].selected.push(num);
                        }
                    });
                    break;
                case '小':
                    plateNumObj.num.forEach((num, index, arr) => {
                        if (num < arr.length / 2) {
                            this.plateOrderObj[plateNumObj.position][num] = true;
                            !this.plateOrderObj[plateNumObj.position].selected.includes(num) && this.plateOrderObj[plateNumObj.position].selected.push(num);
                        } else {
                            this.plateOrderObj[plateNumObj.position][num] = false;
                            const index = this.plateOrderObj[plateNumObj.position].selected.indexOf(num);
                            index !== -1 && this.plateOrderObj[plateNumObj.position].selected.splice(index, 1);
                        }
                    });
                    break;
                case '奇':
                    plateNumObj.num.forEach((num, index, arr) => {
                        if (num % 2 === 0) {
                            this.plateOrderObj[plateNumObj.position][num] = false;
                            const index = this.plateOrderObj[plateNumObj.position].selected.indexOf(num);
                            index !== -1 && this.plateOrderObj[plateNumObj.position].selected.splice(index, 1);
                        } else {
                            this.plateOrderObj[plateNumObj.position][num] = true;
                            !this.plateOrderObj[plateNumObj.position].selected.includes(num) && this.plateOrderObj[plateNumObj.position].selected.push(num);
                        }
                    });
                    break;
                case '偶':
                    plateNumObj.num.forEach((num, index, arr) => {
                        if (num % 2 === 0) {
                            this.plateOrderObj[plateNumObj.position][num] = true;
                            !this.plateOrderObj[plateNumObj.position].selected.includes(num) && this.plateOrderObj[plateNumObj.position].selected.push(num);
                        } else {
                            this.plateOrderObj[plateNumObj.position][num] = false;
                            const index = this.plateOrderObj[plateNumObj.position].selected.indexOf(num);
                            index !== -1 && this.plateOrderObj[plateNumObj.position].selected.splice(index, 1);
                        }
                    });
                    break;
                case '清':
                    plateNumObj.num.forEach(num => {
                        this.plateOrderObj[plateNumObj.position][num] = false;
                        const index = this.plateOrderObj[plateNumObj.position].selected.indexOf(num);
                        index !== -1 && this.plateOrderObj[plateNumObj.position].selected.splice(index, 1);
                    });
                    break;
                default:
                    break;
            }
            this.$set(this.plateOrderObj, `valueChange-${plateNumObj.position}`, Math.random()); //触发监听，vue不能监听增加删除属性，用这个方法才能触发            
            this.$forceUpdate();
        },
        addOrder() {//添加选号
            let betContent;
            if (this.plateType === 'number') {//非单式
                betContent = this.positionArr.map(pos=>{
                    this.plateOrderObj[pos] = this.plateOrderObj[pos] || {};
                    return this.plateOrderObj[pos].selected.toString() || '';
                }).join('|');
            } else if (this.plateType === 'input') {//单式
                betContent = this.dsInputNums.join('|');
            }
            store.commit('addOrderItem', {
                methodCn: this.methodCnName,
                betContent,
                model: this.modelValue,
                times: this.totalTimes,
                betNums: this.totalBet,
                betAmount: this.totalMoney
            });
            this.resetPlate();
        },
        resetPlate() {
            this.plateOrderObj = {};
            this.dsInputNums = [];
            this.numberTimes = 1;//totalTimes
            this.modelValue = 2;
        }
    }
});
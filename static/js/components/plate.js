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
                            <i class="filter-button" v-for="value in plateNumObj.filterArr">{{value}}</i>
                        </span>
                    </div>
                    <div class="ds-input-box" v-if="plateType === 'input'">
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
                    <div class="fl">
                        <number-minus-plus @receive-times="receiveTimes"></number-minus-plus>
                    </div>
                    <div class="fl clearfix number-odd-wrap">
                        <i class="fl number-odd-text">奖金</i>
                        <select class="fl number-odd-select" v-model="selectedOdd">
                            <option :odd="odd" :point="point">{{odd + '~' + point * 100 + '%'}}</option>
                        </select>
                    </div>
                </div>
                <div class="clearfix plate-numbet-bottom-bottom">
                    <span :class="{disabled: addNumberDisabled}" class="fr add-number">添加选号</span>
                    <span :class="{disabled: quickBetDisabled}" class="fr quick-bet">快速投注</span>
                    <span class="fr totals-wrap">
                        <span class="total-bet-wrap">已选<i class="total-bet margin-0-2">{{totalBet}}</i>注，</span><span class="total-times-wrap">共<i class="total-times margin-0-2">{{totalTimes}}</i>倍，</span><span class="total-money-wrap">共计<i class="total-money margin-0-2">{{totalMoney}}</i>元</span>
                    </span>
                </div>
            </div>
        </div>
    `,
    props: ['lottery-config', 'lottery-type', 'lottery-code'],
    data() {
        return {
            normalTabFlag: localStorage.getItem(`${this.lotteryCode}-normalTabFlag`) || 'normal',
            currentTab: '',
            currentSubTab: '',
            plateType: '', //input 单式，number 选号盘
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
            modelArr: [
                {
                    text: '2元',
                    value: 2
                },
                {
                    text: '1元',
                    value: 1
                },
                {
                    text: '2角',
                    value: 0.2
                },
                {
                    text: '1角',
                    value: 0.1
                },
                {
                    text: '2分',
                    value: 0.02
                },
                {
                    text: '2厘',
                    value: 0.002
                }
            ],
            selectedOdd: '',
            numberTimes: 1,
            oddsObj: {},
            modelValue: 2,//倍数
            totalBet: 0,//总注数
            totalMoney: 0,//总金额
            quickBetDisabled: true,
            addNumberDisabled: true
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
        totalTimes() {//总倍数
            return this.numberTimes;
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
                    this.plateType = 'number';
                }
                const positionArr = numArr[0].split(',');
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
        'odd-x'() {
            return this.oddsObj && this.oddsObj[this.method] && this.oddsObj[this.method].x;
        },
        'odd-y'() {
            return this.oddsObj && this.oddsObj[this.method] && this.oddsObj[this.method].y;
        },
        point() {
            return this.oddsObj && this.oddsObj[this.method] && this.oddsObj[this.method].point;
        }
    },
    watch: {},
    methods: {
        receiveTimes(msg) {//倍数
            this.numberTimes = msg;console.log(msg)
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
                    if (this.currentSubTab === 'zux_hh') {
                        if ([...new Set[dsInputValueArr]].length === 1) { //说明是豹子号
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
            this.$forceUpdate();
        },
        switchModel(model) {
            this.modelValue = model.value;
        }
    }
});
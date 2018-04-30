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
                    <span class="sub-tab-item" :class="{on: currentSubTab === middleCode + '_' + key,'sub-tab-dxds-item': currentTab === 'dxds'}" :sub-tab="key" v-for="(obj,key) in subTabObj['method']" @click="switchSubTab(middleCode + '_' + key)">{{obj.desc}}</span>
                </div>
            </div>
            <div class="plate-number">
                <div class="plate-number-top clearfix">
                    <span class="plate-method-hint fl">五星直选复式<i class="question-mark-icon" title="在万位、千位、百位上分别选择一个或多个号码，组合成一注或多注。所选号码与开奖号码一致且顺序相同，即为中奖。"></i></span>
                    <span class="hot-miss-tab fl">
                        <span class="miss-tab on">遗漏</span>
                        <span class="hot-tab">冷热</span>
                        <i class="question-mark-icon" title="遗漏：表示该号码从上次开出至今，有多少期未出现；冷热：表示在最近100期开奖中，该号码在对应的位置上出现的次数"></i>
                    </span>
                </div>
                <div class="plate-number-list">
                    <div v-if="plateType === 'number'" class="plate-number-item clearfix" v-for="(plateNumObj,index) in plateNumArr">
                        <span class="plate-number-position fl">{{plateNumObj.position}}</span>
                        <span class="plate-number-each fl" :class="{on: plateOrderObj[plateNumObj.position]&&plateOrderObj[plateNumObj.position][num]}" v-for="(num,numIndex) in plateNumObj.num" @click="selectNum(plateNumObj.position,num)">{{num}}</span>
                        <span class="plate-filter-button fr" v-if="plateNumObj.filter === 'all'">
                            <i class="filter-button" v-for="value in ['全','大','小','奇','偶','清']">{{value}}</i>
                        </span>
                        <span class="plate-filter-button fr" v-if="plateNumObj.filter === 'two'">
                            <i class="filter-button" v-for="value in ['全','清']">{{value}}</i>
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
                            <textarea class="ds-input" v-model="dsInputValue" @input="pushDsValue"></textarea>
                        </div>
                        <span class="input-upload-btn">上传文件</span>
                        <span class="input-clear-btn">清空</span>
                    </div>
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
        };
    },
    beforeCreate() {},
    created() {
        this.getCurrentTab();
    },
    beforeMount() {},
    mounted() {
        this.switchTab(this.currentTab);
    },
    computed: {
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
                const selectNumArr = numArr[1].split('-'); //"0-9" => ['0','9']
                const selectNumRangeArr = this.$range(selectNumArr[0], selectNumArr[1]); //['0','9'] => [0,1,2,3,4,5,6,7,8,9]
                const filter = numArr[2];
                positionArr.forEach(position => {
                    resultArr.push({
                        position,
                        filter,
                        num: selectNumRangeArr
                    });
                });
            }
            return resultArr;
        }
    },
    watch: {},
    methods: {
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
                this.dsInputValue = this.dsInputValue.replace(/\D/g, '');//只允许输入数字
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
                    }console.log(1,dsInputValueArr)
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
        selectNum(pos,num) {
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
            console.log(this.plateOrderObj)
        }
    }
});
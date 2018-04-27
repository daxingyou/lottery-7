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
                    <div class="plate-number-item clearfix" v-for="(plateNumObj,index) in plateNumArr">
                        <span class="plate-number-position fl">{{plateNumObj.position}}</span>
                        <span class="plate-number-each fl" v-for="(num,numIndex) in plateNumObj.num">{{num}}</span>
                        <span class="plate-filter-button fr" v-if="plateNumObj.filter === 'all'">
                            <i class="filter-button" v-for="value in ['全','大','小','奇','偶','清']">{{value}}</i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `,
    props: ['lottery-config', 'lottery-code'],
    data() {
        return {
            normalTabFlag: localStorage.getItem(`${this.lotteryCode}-normalTabFlag`) || 'normal',
            currentTab: '',
            currentSubTab: '',
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
        plateNumArr() { //渲染选号盘的数据，包括万千百十个位置和选号
            const resultArr = [];
            if (this.currentTab && this.currentSubTab) {
                const middleCode = this.currentSubTab.split('_')[0];
                const lastCode = this.currentSubTab.split('_')[1];
                const obj = this.lotteryConfig['ltMethod'][this.currentTab][middleCode]['method'][lastCode];
                const numArr = obj.num.split('|'); //"千位,百位,十位,个位|0-9|all" => ["千位,百位,十位,个位","0-9","all"]
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
        }
    }
});
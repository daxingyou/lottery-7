Vue.component('lottery-plate', {
    template: '#lottery-plate',
    props: ['lottery-config', 'lottery-code'],
    data() {
        console.log(this)
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
                return Object.keys(this.lotteryConfig[this.lotteryCode]['ltNormalTab'])[0];
            } else if (this.normalTabFlag === 'rx') {
                return Object.keys(this.lotteryConfig[this.lotteryCode]['ltRxTab'])[0];
            }
        },
        firstSubTab() {
            const firstMiddleCode = Object.keys(this.lotteryConfig[this.lotteryCode]['ltMethod'][this.currentTab])[0]; //获取'wx_zx_fs'中的zx值
            return Object.keys(this.lotteryConfig[this.lotteryCode]['ltMethod'][this.currentTab][firstMiddleCode]['method'])[0]; //获取zx_fs
        },
        plateNumArr() { //渲染选号盘的数据，包括万千百十个位置和选号
            const resultArr = [];
            if (this.currentTab && this.currentSubTab) {
                const middleCode = this.currentSubTab.split('_')[0];
                const obj = this.lotteryConfig[this.lotteryCode]['ltMethod'][this.currentTab][middleCode]['method'][this.currentSubTab];
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
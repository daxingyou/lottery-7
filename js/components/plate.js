Vue.component('lottery-plate', {
    template: '#lottery-plate',
    props: ['lottery-config', 'lottery-code'],
    data() {console.log(this)
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
            //获取'wx_zx_fs'中的zx值
            const firstMiddleCode = Object.keys(this.lotteryConfig[this.lotteryCode]['ltMethod'][this.currentTab])[0];
            return Object.keys(this.lotteryConfig[this.lotteryCode]['ltMethod'][this.currentTab][firstMiddleCode]['method'])[0];
        }
    },
    watch: {},
    methods: {
        getCurrentTab() {
            this.currentTab = localStorage.getItem(`${this.lotteryCode}-${this.normalTabFlag}-currentTab`) || this.firstTab;            
        },
        getCurrentSubTab() {
            this.currentTab = localStorage.getItem(`${this.lotteryCode}-${this.normalTabFlag}-currentSubTab`) || this.firstSubTab;            
        },
        changeNormalTabFlag(tabFlag) {
            this.normalTabFlag = tabFlag;
            localStorage.setItem(`${this.lotteryCode}-normalTabFlag`, tabFlag);
            this.getCurrentTab();
            this.switchTab(this.currentTab);
            this.getCurrentSubTab();
            this.switchSubTab(this.currentSubTab);
        },
        switchTab(tab) {
            localStorage.setItem(`${this.lotteryCode}-${this.normalTabFlag}-currentTab`, tab);
            this.currentTab = tab;
        },
        switchSubTab(subTab) {
            localStorage.getItem(`${this.lotteryCode}-${this.normalTabFlag}-currentSubTab`, subTab)
            this.currentSubTab = subTab;
        }
    }
});
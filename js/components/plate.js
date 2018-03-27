Vue.component('lottery-plate', {
    template: '#lottery-plate',
    props: ['lottery-config', 'lottery-code'],
    data() {console.log(this)
        return {
            normalTabFlag: 'normal'
        };
    },
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {
        this.renderPlate(this.currentTab);
    },
    computed: {
        // normalTabFlag() {
        //     return localStorage.getItem(`${this.lotteryCode}-normalTabFlag`) || 'normal';
        // },
        firstTab() {
            if (this.normalTabFlag === 'normal') {
                return Object.keys(this.lotteryConfig[this.lotteryCode]['ltNormalTab'])[0];
            } else if (this.normalTabFlag === 'rx') {
                return Object.keys(this.lotteryConfig[this.lotteryCode]['ltRxTab'])[0];
            }
        },
        currentTab() {
            return localStorage.getItem(`${this.lotteryCode}-currentTab`) || this.firstTab;
        }
    },
    watch: {},
    methods: {
        changeNormalTabFlag(tabFlag) {
            localStorage.setItem(`${this.lotteryCode}-normalTabFlag`, tabFlag);
            this.normalTabFlag = tabFlag;
            this.renderPlate(this.currentTab);
        },
        renderPlate(tab) {console.log(tab)
            localStorage.setItem(`${this.lotteryCode}-currentTab`, tab);
            this.currentTab = tab;
        }
    }
});
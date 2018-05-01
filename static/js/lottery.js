Vue.prototype.$http = axios;
const vueLottery = new Vue({
    el: '#vue-lottery',
    data: {
        theme: 'blue',
        lotteryConfig: {},
        openIssue: '2013-999',
        openCode: '1,3,5,4,5',
        currentIssue: '',
        countTime: 0,
        nextApp: [],
        issueCount: 0
    },
    beforeCreate() {},
    created() {
        this.ajaxIssue();
        this.ajaxLotteryConfig();
    },
    beforeMount() {
        document.body.setAttribute('theme', this.theme);
    },
    mounted() {},
    computed: {
        lotteryType() { //hash="#ssc-cqssc"设计成这样子
            return window.location.hash.slice(1).split('-')[0] || 'ssc';
        },
        lotteryCode() {
            return window.location.hash.slice(1).split('-')[1] || 'CQSSC';
        }
    },
    watch: {
        theme(newVal, oldVal) {//切换主题
            document.body.setAttribute('theme', newVal);
        }
    },
    methods: {
        ajaxIssue() {
            this.$http.get('/json/issue.json').then((res) => {
                const result = res.data.result;
                this.currentIssue = result.issue;
                this.countTime = result.second;
                this.nextApp = result.nextApp;
                this.issueCount = result.issueCount;
            });
        },
        ajaxLotteryConfig() {
            this.$http.get(`/json/${this.lotteryCode.toLowerCase()}.json`).then((res) => {
                this.lotteryConfig = res.data;
            });
        }
    }
});

Vue.prototype.$range = (start, end, step = 1) => {
    start = Number(start);
    end = Number(end);
    const resultArr = [];
    for (let i = start; i < end; i += step) {
        i <= end && resultArr.push(i);
    }
    return resultArr;
};


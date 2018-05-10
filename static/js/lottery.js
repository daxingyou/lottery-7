Vue.prototype.$http = axios;
const vueLottery = new Vue({
    el: '#vue-lottery',
    data: {
        theme: 'blue',
        lotteryConfig: {},
        trendData: [],
        openIssue: '2013-999',
        currentIssue: '',
        countTime: 0,
        nextApp: [],
        issueCount: 0,
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
    },
    beforeCreate() {},
    created() {
        this.ajaxIssue();
        this.ajaxLotteryConfig();
        this.ajaxTrendData();
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
        },
        orderArr() {
            return store.state.orderArr;
        },
        openCode() {
            return this.trendData[0] && this.trendData[0].code;
        },
        openIssue() {
            return this.trendData[0] && this.trendData[0].issueNo; 
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
        },
        ajaxTrendData() {
            this.$http.get(`/json/${this.lotteryCode.toLowerCase()}-trend.json`).then((res) => {
                this.trendData = res.data.result.issue;
            });
        }
    }
});

Vue.prototype.$range = (start, end, step = 1) => {
    start = Number(start);
    end = Number(end);
    const resultArr = [];
    for (let i = start; i <= end; i += step) {
        resultArr.push(i);
    }
    return resultArr;
};


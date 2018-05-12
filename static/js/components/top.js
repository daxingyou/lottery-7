Vue.component('lottery-top', {
    template: `
        <div class="lottery-top-wrap clearfix">
            <div class="lottery-top-left fl">
                <img :src="'./images/logo/' + lotteryCode + '.png'" width="50" height="50" class="lottery-top-logo">
                <span class="lottery-top-name">{{lotteryConfig['cnName']}}</span>
            </div>
            <div class="lottery-top-center fl">
                <div class="lottery-current-issue">
                    <p class="current-issue-text current-issue-text-up">第<span class="current-issue-num">{{currentIssue}}</span>期</p>
                    <p class="current-issue-text">投注截止还有</p>
                </div>
                <div class="lottery-count-time">
                    <i class="lottery-count-time-item">{{hours}}</i>
                    <i class="lottery-count-time-item lottery-count-time-minutes">{{minutes}}</i>
                    <i class="lottery-count-time-item">{{seconds}}</i>
                </div>
            </div>
            <div class="lottery-top-right fr">
                <div class="lottery-open-issue">
                    <p class="open-issue-text open-issue-text-up">第<span class="open-issue-num">{{openIssue}}</span>期</p>
                    <p class="open-issue-text">开奖号码</p>
                </div>
                <div class="lottery-open-code">
                    <i v-for="(item,index) in openCodeArr" class="open-code-num" :class="openCodeClassObject">{{item}}</i>
                </div>
            </div>
        </div>
    `,
    props: ['lottery-config', 'lottery-type', 'lottery-code', 'open-issue', 'open-code'],
    data() {
        return {
            openCodeClassObject: {
                'open-code-ssc': this.lotteryType === 'ssc',
                'open-code-11x5': this.lotteryType === '11x5',
                'open-code-pk10': this.lotteryType === 'pk10',
                'open-code-k3': this.lotteryType === 'k3',
                'open-code-3d': this.lotteryType === '3d',
                'open-code-kl12': this.lotteryType === 'kl12',
                'open-code-ky481': this.lotteryType === 'ky481',
                'open-code-lhc': this.lotteryType === 'lhc',
            },
            currentIssue: '',
            countTime: '',
        };
    },
    beforeCreate() {},
    created() {
        this.ajaxIssue();
    },
    beforeMount() {},
    mounted() {
        this.countDown();
    },
    computed: {
        hours() {
            let hours = Math.floor(this['countTime'] / 60 / 60);
            hours = hours > 99 ? 99 : hours;
            hours = hours < 10 ? `0${hours}` : hours;
            return hours;
        },
        minutes() {
            let minutes = Math.floor(this['countTime'] / 60);
            minutes = minutes < 10 ? `0${minutes}` : minutes;
            return minutes;
        },
        seconds() {
            let seconds = this['countTime'] % 60;
            seconds = seconds < 10 ? `0${seconds}` : seconds;
            return seconds;
        },
        openCodeArr() {
            return this['openCode'] ? this['openCode'].split(',') : [];
        }
    },
    watch: {},
    methods: {
        ajaxIssue() {
            this.$http.get('/json/issue.json').then((res) => {
                const result = res.data.result;
                this.currentIssue = result.issue;
                this.countTime = result.second;
            });
        },
        countDown() {
            const timeout = setTimeout(()=>{
                if (this['countTime'] <= 0) {
                    clearInterval(timeout);
                    this.ajaxIssue();
                    this.countDown();                    
                    return;
                }
                this['countTime']--;
                this.countDown();
            },1000);
        }
    }
});
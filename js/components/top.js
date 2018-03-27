Vue.component('lottery-top', {
    template: '#lottery-top',
    props: ['lottery-config', 'lottery-type', 'lottery-code', 'current-issue', 'count-time', 'open-issue', 'open-code'],
    data() {console.log(this)
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
            }
        };
    },
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {},
    computed: {
        hours() {
            let hours = Math.floor(this['countTime'] / 60 / 60);
            hours = hours > 99 ? 99 : hours;
            return hours;
        },
        minutes() {
            let minutes = Math.floor(this['countTime'] / 60);
            minutes = minutes < 10 ? `0{minutes}` : minutes;
            return minutes;
        },
        seconds() {
            let seconds = this['countTime'] % 60;
            seconds = seconds < 10 ? `0${seconds}` : seconds;
            return seconds;
        },
        openCodeArr() {
            return this['openCode'].split(',');
        }
    },
    watch: {},
    methods: {

    }
});
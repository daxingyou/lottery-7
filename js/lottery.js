const vueLottery = new Vue({
    el: '#vue-lottery',
    data: {
        openIssue: '',
    },
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {},
    computed: {
        lotteryType() {//hash="#ssc-cqssc"设计成这样子
            return window.location.hash.slice(1).split('_')[0];
        },
        lotteryCode() {
            return window.location.hash.slice(1).split('_')[1];
        }
    },
    watch: {},
    methods: {

    }
});
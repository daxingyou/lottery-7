Vue.component('lottery-top', {
    template: '#lottery-top',
    props: ['lotteryConfig','lotteryCode','currentIssue','countTime','openIssue','lotteryType'],
    data() {
        return {
            openCodeClassObject: {
                'open-code-ssc': lotteryType === 'ssc',
                'open-code-11x5': lotteryType === '11x5',
                'open-code-pk10': lotteryType === 'pk10',
                'open-code-k3': lotteryType === 'k3',
                'open-code-3d': lotteryType === '3d',
                'open-code-kl12': lotteryType === 'kl12',
                'open-code-ky481': lotteryType === 'ky481',
                'open-code-lhc': lotteryType === 'lhc',
            }
        };
    },
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {},
    computed: {

    },
    watch: {},
    methods: {

    }
});
Vue.component('lottery-order', {
    template: `
        <div class="lottery-order-wrap">
            <ul class="lottery-order-list">
                <li class="clearfix lottery-order-item lottery-order-item-head text-left">
                    <span class="fl ellipsis order-method-cn">玩法</span>
                    <span class="fl ellipsis order-bet-content">投注内容</span>
                    <span class="fl ellipsis order-model">模式</span>
                    <span class="fl ellipsis order-times">倍数</span>
                    <span class="fl ellipsis order-bet-nums">投注数</span>
                    <span class="fl ellipsis order-bet-amount">投注金额</span>
                    <span class="fl ellipsis order-delete">清空</span>
                </li>
                <li class="clearfix lottery-order-item text-left" v-for="item in orderArr">
                    <span class="fl ellipsis order-method-cn">{{item.methodCn}}</span>
                    <span class="fl ellipsis order-bet-content">{{item.betContent}}</span>
                    <span class="fl ellipsis order-model"><select-model :model-value="item.model" :model-arr="modelArr"></select-model></span>
                    <span class="fl ellipsis order-times"><number-minus-plus :default-times="item.times" @receive-times="receiveTimes(item)"></number-minus-plus></span>
                    <span class="fl ellipsis order-bet-nums">{{item.betNums}}</span>
                    <span class="fl ellipsis order-bet-amount">{{item.betAmount}}</span>
                    <span class="fl ellipsis order-delete"><i class="order-delete-icon">x</i></span>
                </li>
            </ul>
        </div>
    `,
    props: ['order-arr', 'model-arr'],
    data() {
        return {
            
        };
    },
    beforeCreate() {},
    created() {
        
    },
    beforeMount() {},
    mounted() {
    },
    computed: {
        
    },
    watch: {},
    methods: {
        receiveTimes(item, msg) {
            // console.log(msg,item);
        }
    }
});
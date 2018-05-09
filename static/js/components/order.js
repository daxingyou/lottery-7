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
                <li class="clearfix lottery-order-item text-left" v-for="(item, index) in orderArr">
                    <span class="fl ellipsis order-method-cn">{{item.methodCn}}</span>
                    <span class="fl ellipsis order-bet-content" :title="item.betContent">{{item.betContent}}</span>
                    <span class="fl ellipsis order-model"><select-model :index="index" :model-value="item.model" :model-arr="modelArr" @receive-model="receiveModel"></select-model></span>
                    <span class="fl ellipsis order-times"><number-minus-plus :index="index" :default-times="item.times" @receive-times="receiveTimes"></number-minus-plus></span>
                    <span class="fl ellipsis order-bet-nums">{{item.betNums}}</span>
                    <span class="fl ellipsis order-bet-amount">{{calcBetMoney(item.model, item.times, item.betNums)}}</span>
                    <span class="fl ellipsis order-delete"><i class="order-delete-icon" @click="deleteOrderItem(index)">x</i></span>
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
        receiveTimes(msg, index) {
            this.orderArr[index].times = msg;
        },
        receiveModel(msg, index) {
            this.orderArr[index].model = msg;
        },
        calcBetMoney(model, times, betNums) {
            const fixedFlag = String(model).split('.')[1] ? String(model).split('.')[1].length : 0;
            return (model * times * betNums).toFixed(fixedFlag);
        },
        deleteOrderItem(index) {
            this.orderArr.splice(index, 1);
        }
    }
});
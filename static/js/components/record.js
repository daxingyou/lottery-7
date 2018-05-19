Vue.component('lottery-record', {
    template: `
        <div class="record-wrap">
            <div class="record-tab">
                <span>投注记录</span>
            </div>
            <ul class="record-list">
                <li class="record-item record-item-head">
                    <span class="record-item-time">投注时间</span>
                    <span class="record-item-issue">奖期</span>
                    <span class="record-item-method">玩法</span>
                    <span class="record-item-code">投注内容</span>
                    <span class="record-item-amount">投注金额</span>
                    <span class="record-item-status">中奖情况</span>
                    <span class="record-item-mani">操作</span>            
                </li>
                <li class="record-item" v-for="item in recordData">
                    <span class="record-item-time">{{item.orderTime}}</span>
                    <span class="record-item-issue">{{item.issue}}</span>
                    <span class="record-item-method">{{methodCnName(item.method)}}</span>
                    <span class="record-item-code">{{item.code}}</span>
                    <span class="record-item-amount">{{item.amount}}</span>
                    <span class="record-item-status">{{item.status}}</span>
                    <span class="record-item-mani">
                        <em class="bet-again" @click="betAgain(item)">再次投注</em>
                        <em class="bet-cancel" @click="cancel(item)" v-if="item.cancel">撤销</em>                
                    </span>            
                </li>
            </ul>
        </div>
    `,
    props: ['lottery-config'],
    data() {
        return {
            recordData: []
        };
    },
    beforeCreate() {},
    created() {
        this.ajaxRecord();
    },
    beforeMount() {},
    mounted() {},
    computed: {},
    watch: {},
    methods: {
        ajaxRecord() {
            this.$http.get('/json/bet-record.json').then(res=>{
                this.recordData = res.data.result;
            });
        },
        methodCnName(method) {
            const methodArr = method.split('_');
            return this.lotteryConfig.ltMethod[methodArr[0]][methodArr[1]].method[methodArr[2]].name;
        },
        betAgain(item) {},
        cancel(item) {}
    }
});
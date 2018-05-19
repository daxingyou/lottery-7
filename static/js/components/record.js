Vue.component('lottery-record', {
    template: `
        <div class="record-wrap">
            <div class="record-tab clearfix">
                <span class="fl record-tab-bet">投注记录</span>
                <span class="fr record-tab-hide" @click="hideItem = !hideItem">{{hideItem ? '隐藏' : '展开'}}</span>                
            </div>
            <ul class="record-list record-list-head">
                <li class="record-item record-item-head">
                    <span class="record-item-time">投注时间</span>
                    <span class="record-item-issue">奖期</span>
                    <span class="record-item-method">玩法</span>
                    <span class="record-item-code ellipsis">投注内容</span>
                    <span class="record-item-amount">投注金额</span>
                    <span class="record-item-status">中奖情况</span>
                    <span class="record-item-mani">操作</span>            
                </li>
            </ul>
            <ul class="record-list">
                <li class="record-item" v-if="hideItem" v-for="item in recordData">
                    <span class="record-item-time">{{formatTime(item.orderTime, 'MM-dd hh:mm:ss')}}</span>
                    <span class="record-item-issue">{{item.issue}}</span>
                    <span class="record-item-method">{{methodCnName(item.method)}}</span>
                    <span class="record-item-code ellipsis">{{item.code}}</span>
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
            recordData: [],
            hideItem: true
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
            this.$http.get('/json/bet-record.json').then(res => {
                this.recordData = res.data.result;
            });
        },
        methodCnName(method) {
            const methodArr = method.split('_');
            return this.lotteryConfig.ltMethod[methodArr[0]][methodArr[1]].method[methodArr[2]].name;
        },
        formatTime(time, format) {
            let month = new Date(time).getMonth() + 1;
            month = `0${month}`.slice(-2);
            let day = new Date(time).getDate();
            day = `0${day}`.slice(-2);            
            let hours = new Date(time).getHours();
            hours = `0${hours}`.slice(-2);            
            let minutes = new Date(time).getMinutes();
            minutes = `0${minutes}`.slice(-2);            
            let seconds = new Date(time).getSeconds();
            seconds = `0${seconds}`.slice(-2);            
            return 'MM-dd hh:mm:ss'.replace(/MM/, month).replace(/dd/, day).replace(/hh/, hours).replace(/mm/, minutes).replace(/ss/, seconds);
        },
        betAgain(item) {},
        cancel(item) {}
    }
});
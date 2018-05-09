Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        orderArr: [{
            methodCn: '五星直选复式',
            betContent: '12345',
            model: 2,
            times: 1,
            betNums: 2,
            betAmount: 4
        }],
    },
    mutations: {
        addOrderItem(state, item) {
            state.orderArr.push(item);console.log(item);
        }
    }
});
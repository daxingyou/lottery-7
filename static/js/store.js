const store = new Vuex.Store({
    state: {
        orderArr: [],
    },
    mutations: {
        addOrderItem(state, item) {
            state.orderArr.push(item);
        }
    }
});
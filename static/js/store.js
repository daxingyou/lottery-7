const store = new Vuex.Store({
    state: {
        orderArr: [],
        method: '',
    },
    mutations: {
        addOrderItem(state, item) {
            state.orderArr.push(item);
        },
        getMethod(state, method) {
            state.method = method;
        }
    }
});
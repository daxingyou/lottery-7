const store = new Vuex.Store({
    state: {
        orderArr: [],
        method: '',
        plateHeight: '0px'
    },
    mutations: {
        addOrderItem(state, item) {
            state.orderArr.push(item);
        },
        getMethod(state, method) {
            state.method = method;
        },
        getPlateHeight(state, plateHeight) {
            state.plateHeight = plateHeight;
        }
    }
});
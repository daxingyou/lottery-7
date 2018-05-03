Vue.component('select-model', {
    template: `
        <select class="select-model" v-model="selectedModel">
            <option v-for="model in modelArr" :value="model.value" @change="switchModel(model)">{{model.text}}</option>
        </select>
    `,
    props: ['model-value', 'model-arr'],
    data() {
        return {
            selectedModel: 2
        };
    },
    created() {
        this.selectedModel = this.modelValue;//如果设置了默认值就用默认值
    },
    methods: {
        switchModel(model) {
            this.$emit('receive-model', this.selectedModel);
        }
    }
});
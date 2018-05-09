Vue.component('select-model', {
    template: `
        <select class="select-model" v-model="selectedModel" @change="switchModel">
            <option v-for="model in modelArr" :value="model.value">{{model.text}}</option>
        </select>
    `,
    props: ['model-value', 'model-arr', 'index'],
    data() {
        return {
            selectedModel: 2
        };
    },
    created() {
        this.selectedModel = this.modelValue;//如果设置了默认值就用默认值
    },
    methods: {
        switchModel() {
            this.$emit('receive-model', this.selectedModel, this.index);
        }
    }
});
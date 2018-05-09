Vue.component('number-minus-plus', {
    template: `
        <div class="fl clearfix number-minus-plus-wrap">
            <i class="fl number-times">倍数</i>
            <i class="fl number-minus" @click="minus">-</i>
            <input class="fl number-minus-plus" type="number" v-model="times" @input="modify"/>
            <i class="fl number-plus" @click="plus">+</i>
        </div>
    `,
    data() {
        return {
            times: 1
        };
    },
    props: ['default-times', 'index'],
    created() {
        this.times = this.defaultTimes || 2;
    },
    methods: {
        plus() {
            this.times = Number(this.times);
            this.times += 1;
            this.$emit('receive-times', this.times, this.index);
        },
        minus() {
            this.times = Number(this.times);
            if (this.times === 1) return;
            this.times -= 1;
            this.$emit('receive-times', this.times, this.index);
        },
        modify() {
            this.times = Number(this.times);
            this.$emit('receive-times', this.times, this.index);
        }
    },
    mounted() {
        this.$emit('receive-times', this.times, this.index);
    }
});
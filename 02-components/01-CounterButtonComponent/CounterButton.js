import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default() {
        return 0;
      },
    },
  },

  emits: ['update:count'],

  methods: {
    countUp() {
      let localCount = this.count;
      this.$emit('update:count', (localCount += 1));
    },
  },

  template: `<button type="button" @click="countUp">{{ count }}</button>`,
});

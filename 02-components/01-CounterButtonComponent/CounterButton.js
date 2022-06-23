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
      this.$emit('update:count', this.count + 1);
    },
  },

  template: `<button type="button" @click="countUp">{{ count }}</button>`,
});

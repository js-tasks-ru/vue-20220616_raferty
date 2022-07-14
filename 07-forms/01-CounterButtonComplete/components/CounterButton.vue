<template>
  <button @click="countUp">{{ proxyCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  emits: ['update:count'],

  data() {
    return {
      proxyCount: this.count,
    };
  },

  watch: {
    count: {
      immidiate: true,
      handler(value) {
        this.proxyCount = value;
      },
    },
  },

  methods: {
    countUp() {
      this.$emit('update:count', (this.proxyCount += 1));
    },
  },
};
</script>

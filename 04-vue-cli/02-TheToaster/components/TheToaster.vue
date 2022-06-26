<template>
  <ui-toast-list>
    <ui-toast v-for="(toast, index) in toasts" :key="index" :toast="toast" :duration="duration" dismissible />
  </ui-toast-list>
</template>

<script>
import UiToastList from './UiToastList.vue';
import UiToast from './UiToast.vue';
import UiIcon from './UiIcon.vue';

export default {
  name: 'TheToaster',

  components: { UiIcon, UiToast, UiToastList },

  data() {
    return {
      toasts: [],
      duration: 5000,
      intervalId: null,
    };
  },

  watch: {
    toasts: {
      deep: true,
      handler(newValue) {
        if (newValue.length > 0) {
          this.intervalId = setInterval(() => {
            this.removeToast();
          }, this.duration);
        } else {
          clearInterval(this.intervalId);
        }
      },
    },
  },

  methods: {
    success(message) {
      this.toasts.push({
        id: Math.random().toString(16).slice(2),
        message,
        type: 'success',
      });
    },

    error(message) {
      this.toasts.push({
        id: Math.random().toString(16).slice(2),
        message,
        type: 'error',
      });
    },

    removeToast() {
      this.toasts.shift();
    },
  },
};
</script>

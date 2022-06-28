<template>
  <ui-toast-list>
    <ui-toast v-for="(toast, index) in toasts" :key="index" :toast="toast" dismissible @onRemove="removeToastById" />
  </ui-toast-list>
</template>

<script lang="ts">
import UiToastList from './UiToastList.vue';
import UiToast from './UiToast.vue';
import UiIcon from './UiIcon.vue';

import { defineComponent } from 'vue';

interface Toasts {
  id: string;
  message: string;
  type: string;
}

export default defineComponent({
  name: 'TheToaster',

  components: { UiIcon, UiToast, UiToastList },

  data() {
    return {
      toasts: [] as Toasts[],
      duration: 5000,
      intervalId: 0,
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
    success(message: string): void {
      this.toasts.push({
        id: Math.random().toString(16).slice(2),
        message,
        type: 'success',
      });
    },

    error(message: string): void {
      this.toasts.push({
        id: Math.random().toString(16).slice(2),
        message,
        type: 'error',
      });
    },

    removeToast(): void {
      this.toasts.shift();
    },

    removeToastById(id: string): void {
      this.toasts = this.toasts.filter((toast) => toast.id !== id);
    },
  },
});
</script>

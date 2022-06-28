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
    };
  },

  methods: {
    success(message: string): void {
      const toastId = Math.random().toString(16).slice(2);

      this.toasts.push({
        id: toastId,
        message,
        type: 'success',
      });

      setTimeout(() => {
        this.removeToastById(toastId);
      }, this.duration);
    },

    error(message: string): void {
      const toastId = Math.random().toString(16).slice(2);

      this.toasts.push({
        id: toastId,
        message,
        type: 'error',
      });

      setTimeout(() => {
        this.removeToastById(toastId);
      }, this.duration);
    },

    removeToastById(id: string): void {
      this.toasts = this.toasts.filter((toast) => toast.id !== id);
    },
  },
});
</script>

<template>
  <div :class="classes">
    <ui-icon class="toast__icon" :icon="toastIcon" />
    <span class="toast__message">{{ toast.message }}</span>
    <ui-icon v-if="dismissible" class="toast__icon" icon="trash" @click="removeToast" />
  </div>
</template>

<script lang="ts">
import UiIcon from './UiIcon.vue';
import { defineComponent } from 'vue';

interface ToastTypes {
  success: string;
  error: string;
}

const toastTypes: ToastTypes = {
  success: 'check-circle',
  error: 'alert-circle',
};

export default defineComponent({
  name: 'UiToast',

  components: { UiIcon },

  props: {
    toast: {
      type: Object,
      required: true,
    },
    dismissible: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['onRemove'],

  computed: {
    classes(): object {
      return {
        toast: true,
        [`toast_${this.toast.type}`]: true,
      };
    },

    toastIcon(): string {
      return toastTypes[this.toast.type as keyof ToastTypes];
    },
  },

  methods: {
    removeToast(): void {
      this.$emit('onRemove', this.toast.id);
    },
  },
});
</script>

<style>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__message {
  flex: 1;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>

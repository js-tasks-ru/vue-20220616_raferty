<template>
  <div :class="classes">
    <ui-icon class="toast__icon" :icon="toastIcon" />
    <span class="toast__message">{{ toast.message }}</span>
    <ui-icon v-if="dismissible" class="toast__icon" icon="trash" />
  </div>
</template>

<script>
import { toastTypes } from '../toastService';
import UiIcon from './UiIcon.vue';

export default {
  name: 'UiToast',

  components: { UiIcon },

  props: {
    toast: {
      type: Object,
      default() {
        return {};
      },
    },
    dismissible: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      intervalId: null,
    };
  },

  computed: {
    classes() {
      return {
        toast: true,
        [`toast_${this.toast.type}`]: true,
      };
    },

    toastIcon() {
      return toastTypes[this.toast.type];
    },
  },
};
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

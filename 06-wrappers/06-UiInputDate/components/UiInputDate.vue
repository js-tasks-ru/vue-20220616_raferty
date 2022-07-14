<template>
  <ui-input :model-value="modelProxy" :type="type" v-bind="$attrs" @input="handleInput">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';

export default {
  name: 'UiInputDate',

  components: { UiInput },

  inheritAttrs: false,

  props: {
    type: {
      type: String,
      default: 'date',
    },
    modelValue: {
      type: Number,
      default: null,
    },
  },

  emits: ['update:modelValue'],

  computed: {
    modelProxy() {
      return this.formatDate(this.modelValue);
    },
  },

  methods: {
    handleInput($event) {
      this.$emit('update:modelValue', $event.target.value === '' ? null : $event.target.valueAsNumber);
    },

    formatDate(date) {
      const formattedDate = new Date(date);

      switch (this.type) {
        case 'date':
          if (date === null) {
            return;
          }
          return formattedDate.toISOString().split('T')[0];
        case 'time': {
          let hours = formattedDate.getUTCHours();

          if (hours < 10) {
            hours = `0${hours}`;
          }

          let minutes = formattedDate.getUTCMinutes();

          if (minutes < 10) {
            minutes = `0${minutes}`;
          }

          return hours + ':' + minutes;
        }

        case 'datetime-local':
          return formattedDate.toISOString().slice(0, formattedDate.toISOString().length - 8);
      }
    },
  },
};
</script>

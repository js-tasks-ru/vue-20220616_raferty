import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupDescription',

  props: {
    description: {
      type: String,
      require: false,
      default: '',
    },
  },

  template: `<p class="meetup-description">{{ description }}</p>`,
});

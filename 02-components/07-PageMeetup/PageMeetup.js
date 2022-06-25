import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from './meetupService.js';
import MeetupView from '../06-MeetupView/MeetupView';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      require: true,
    },
  },

  data() {
    return {
      meetup: undefined,
      loading: true,
      error: false,
      errorMessage: undefined,
    };
  },

  watch: {
    meetupId: {
      immediate: true,
      async handler(value) {
        this.error = false;
        this.loading = true;
        this.meetup = undefined;

        try {
          const result = await fetchMeetupById(value);

          this.loading = false;
          this.meetup = result;
        } catch (error) {
          this.error = true;
          this.errorMessage = error.message;
        }
      },
    },
  },

  template: `
    <div class="page-meetup">
      <meetup-view :meetup="meetup" v-if="!loading && meetup" />

      <ui-container v-else-if="loading && !error">
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>

      <ui-container v-if="error">
        <ui-alert>{{ errorMessage }}</ui-alert>
      </ui-container>
    </div>`,
});

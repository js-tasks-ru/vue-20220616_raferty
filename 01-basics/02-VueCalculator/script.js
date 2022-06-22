import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const App = defineComponent({
  name: 'SimpleCalculator',

  data() {
    return {
      firstOperand: '',
      secondOperand: '',
      operator: 'sum',
      message: '',
    };
  },

  computed: {
    calcResult() {
      switch (this.operator) {
        case 'sum':
          return this.firstOperand + this.secondOperand;
        case 'subtract':
          return this.firstOperand - this.secondOperand;
        case 'multiply':
          return this.firstOperand * this.secondOperand;
        case 'divide':
          return this.firstOperand / this.secondOperand;
      }

      return false;
    },
  },

  watch: {
    secondOperand(value) {
      if ((value === 0 || !value) && this.operator === 'divide') {
        this.message = 'На ноль делить нельзя!';
      } else {
        this.message = '';
      }
    },

    operator(value) {
      if (value === 'divide' && this.secondOperand === 0) {
        this.message = 'На ноль делить нельзя!';
      } else {
        this.message = '';
      }
    },
  },
});

const app = createApp(App);

app.mount('#app');

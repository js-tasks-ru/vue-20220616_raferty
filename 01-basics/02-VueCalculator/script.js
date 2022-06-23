import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const App = defineComponent({
  name: 'SimpleCalculator',

  data() {
    return {
      firstOperand: '',
      secondOperand: '',
      operator: 'sum',
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

    message() {
      return this.operator === 'divide' && this.secondOperand === 0 ? 'На ноль делить нельзя!' : '';
    },
  },
});

const app = createApp(App);

app.mount('#app');

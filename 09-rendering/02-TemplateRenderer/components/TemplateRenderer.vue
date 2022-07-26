<script>
import { compile } from 'vue';

export default {
  name: 'TemplateRenderer',

  props: {
    template: {
      type: String,
      required: true,
    },

    bindings: {
      type: Object,
      default: () => ({}),
    },

    components: {
      type: [Object, Array],
      default: () => [],
    },
  },

  methods: {
    renderFunction() {
      return compile(this.template);
    },
  },

  render(...args) {
    return this.renderFunction.apply(this, args);
  },

};
</script>

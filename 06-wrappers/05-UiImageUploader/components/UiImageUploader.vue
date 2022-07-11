<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': currentCondition === 'loading' }"
      :style="[currentCondition === 'filled' ? `--bg-url:url(${localImage})` : '']"
    >
      <span class="image-uploader__text">{{ currentConditionText }}</span>
      <input
        v-bind="$attrs"
        ref="fileInput"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        @[eventName].prevent="onFileChange"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',

  inheritAttrs: false,

  props: {
    preview: {
      type: String,
    },
    uploader: {
      type: Function,
    },
  },

  emits: ['select', 'upload', 'remove', 'error'],

  conditions: {
    empty: 'Загрузить изображение',
    loading: 'Загрузка...',
    filled: 'Удалить изображение',
  },

  data() {
    return {
      currentCondition: 'empty',
      localImage: null,
    };
  },

  watch: {
    preview: {
      immediate: true,
      handler(newValue) {
        if(newValue) {
          this.localImage = newValue;
          this.currentCondition = 'filled';
        }
      }
    },
  },

  computed: {
    currentConditionText() {
      return this.$options.conditions[this.currentCondition];
    },

    eventName() {
      return this.localImage ? 'click' : 'change';
    },
  },

  methods: {
    reset() {
      this.currentCondition = 'empty';
      this.$refs.fileInput.value = '';
      this.localImage = null;
    },

    onFileChange() {
      if (this.localImage) {
        this.$emit('remove');
        this.reset();
        return false;
      }

      this.$emit('select', this.$refs.fileInput.files[0]);
      this.currentCondition = 'loading';

      if (this.uploader) {
        this.uploader(this.$refs.fileInput.files[0])
          .then((response) => {
            this.currentCondition = 'filled';
            this.$emit('upload', response);
          })
          .catch((error) => {
            this.$emit('error', error);
            this.reset();
          });
      } else {
        const file = URL.createObjectURL(this.$refs.fileInput.files[0]);

        this.localImage = file;
        this.currentCondition = 'filled';
      }
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>

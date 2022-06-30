<template>
  <ui-container>
    <h2 class="title">IndexPage</h2>
    Для проверки:
    <div><router-link to="/login?from=/">/login?from=/</router-link></div>
    <div><router-link to="/login?from=/register">/login?from=/register</router-link></div>
  </ui-container>
</template>

<script>
import UiContainer from '../components/UiContainer';

export default {
  name: 'PageIndex',
  components: { UiContainer },
};
</script>

<style></style>

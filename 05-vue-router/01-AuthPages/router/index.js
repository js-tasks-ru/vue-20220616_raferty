import { createRouter, createWebHistory } from 'vue-router';

const routes = [{
  path: '/',
  name: 'Home',
  component: () => import('../views/PageIndex'),
},{
  path: '/login',
  name: 'Login',
  component: () => import('../views/PageLogin'),
},{
  path: '/register',
  name: 'Registration',
  component: () => import('../views/PageRegister'),
}];

export const router = createRouter({
  history: createWebHistory('/05-vue-router/01-AuthPages'),
  routes,
});

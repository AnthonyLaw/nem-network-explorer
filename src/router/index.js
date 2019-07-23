import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: () => import('@/views/Home'),
    //   meta: {
    //     title: 'NEM Explorer',
    //   },
    // },
    {
      path: '/',
      name: 'blocks',
      component: () => import('@/views/Blocks'),
    },
    // {
    //   path: 'network-stat',
    //   name: 'network-stat',
    //   component: () => import('@/views/NetworkStat'),
    // },
    // {
    //   path: 'map',
    //   name: 'map',
    //   component: () => import('@/views/Map'),
    // },
  ],
});

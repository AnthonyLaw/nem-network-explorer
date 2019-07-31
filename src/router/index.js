import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Blocks'),
      meta: {
        title: 'NEM Explorer',
      },
    },
    {
      path: '/blocks',
      name: 'blocks',
      component: () => import('@/views/Blocks'),
    },
    {
      path: '/block/:blockHeight',
      name: 'block-detail',
      component: () => import('@/views/BlockDetail'),
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

import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: () =>
        import("./views/Home.vue"),
      meta: {
        title: 'Home Page - Example App',
      }
    },
    {
      path: "/network_stat",
      name: "network_stat",
      component: () =>
        import("./views/network_stat.vue")
    },
    {
      path: "/map",
      name: "map",
      component: () =>
        import("./views/Map.vue")
    },
    // {
    //   path: '/404',
    //   component: import(/* webpackChunkName: "about" */ "./views/About.vue")
    // },
  ]
});

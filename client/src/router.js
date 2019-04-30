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
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
       path: '/404',
       component: import(/* webpackChunkName: "about" */ "./views/About.vue") },
  ]
});

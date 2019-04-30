import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import TopHead from "@/components/TopHead.vue";
import PageMenu from "@/components/PageMenu.vue";
import Pagefooter from "@/components/PageFooter.vue";

Vue.config.productionTip = false;
Vue.component('top-header',TopHead);
Vue.component('page-menu',PageMenu);
Vue.component('page-footer',Pagefooter);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
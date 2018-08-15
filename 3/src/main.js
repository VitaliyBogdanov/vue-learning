import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";

import AsyncComputed from "vue-async-computed";
import Message from "vue-m-message";
import NProgress from "nprogress";

import "vue-m-message/dist/css/default.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "nprogress/nprogress.css";

Vue.use(AsyncComputed);
Vue.use(Message);

// Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});
router.afterEach(() => {
  NProgress.done(true);
});

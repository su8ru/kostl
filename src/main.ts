import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import BootstrapVue from "bootstrap-vue";
Vue.use(BootstrapVue);
import "@/assets/sass/main.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas, far, fab);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

import Axios from "axios";
Axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

import VueGtag from "vue-gtag";
Vue.use(
  VueGtag,
  {
    config: { id: "UA-159940956-1" }
  },
  router
);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

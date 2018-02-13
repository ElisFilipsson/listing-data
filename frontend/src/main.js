// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueMoment from 'vue-moment'
import App from "./App";
// import sv from 'vee-validate/dist/locale/sv';
// import VeeValidate, { Validator } from 'vee-validate';

import "./assets/bulma.scss";

require('moment/locale/sv');

Vue.config.productionTip = process.env.NODE_ENV !== "production";
Vue.config.performance = process.env.NODE_ENV !== "production";

Vue.config.silent = process.env.NODE_ENV === "production";

Vue.directive("focus", {
  inserted: function (el, binding, vnode) {
    Vue.nextTick(function () {
      el.focus();
    });
  },
});

Vue.use(VueMoment);
// Validator.addLocale(sv);

// Install the Plugin and set the locale.
/* Vue.use(VeeValidate, {
  locale: 'sv'
}); */

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  created: function () {
  }
})

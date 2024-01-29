//import Vue from 'vue';
import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify'
import i18n from './i18n'

Vue.config.productionTip = false;

const app = new Vue({
  vuetify,
  i18n,
  render: h => h(App)
});

app.$mount('#app');
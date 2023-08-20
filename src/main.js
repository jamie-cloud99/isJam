import "./assets/main.css";
import "./assets/icofont/icofont.min.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";
import VueAxios from "vue-axios";

import App from "./App.vue";
import router from "./router";

import { getImageUrl } from "./methods/format";

import { Field, Form, ErrorMessage, defineRule, configure } from "vee-validate";
import AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
setLocale('zh_TW');


const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);

app.component('VField', Field);
app.component('VForm', Form);
app.component('ErrorMessage', ErrorMessage);

app.config.globalProperties.$format = {
  getImageUrl,
};

app.mount("#app");

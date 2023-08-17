import './assets/main.css'
import './assets/icofont/icofont.min.css'


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'


import App from './App.vue'
import router from './router'

import {getImageUrl } from './methods/format'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)

app.config.globalProperties.$format = {
  getImageUrl
}

app.mount('#app')

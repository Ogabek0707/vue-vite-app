import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'
import veeValidatePlugins from './plugins/vee-validate'
import VueTelInput from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'
import VueTheMask from "vue-the-mask"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret, faEye, faEyeSlash)
const VueTelInputOPtions = {
      mode: "International",
      onlyCountries: ["UZ", "RU", "US"]
}
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(VueTheMask)
app.use(ElementPlus)
app.use(veeValidatePlugins)
app.use(VueTelInput,VueTelInputOPtions)
.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
}
export default app;


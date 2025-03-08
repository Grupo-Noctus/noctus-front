
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { vuetify } from '../src/plugins/theme'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
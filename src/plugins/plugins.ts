import { createApp } from "vue";
import { createPinia } from "pinia";
import { vuetify } from "@/plugins/vuetify";
import { notivue } from "./notivue";

import App from "@/App.vue";
import router from "@/plugins/router/router";

export default function plugins() {
    const app = createApp(App);
    app.use(vuetify).use(router).use(createPinia()).use(notivue);
    return app;
}

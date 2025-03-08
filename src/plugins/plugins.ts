import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "@/App.vue";
import router from "@/plugins/router/router";

export default function plugins() {
    const app = createApp(App);
    app.use(router).use(createPinia());
    return app;
}

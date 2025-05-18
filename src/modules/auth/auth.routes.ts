import type { RouteRecordRaw } from "vue-router";

import Login from "./view/index-login.vue";
import Register from "./view/index-register.vue";

export const authRoutes: RouteRecordRaw[] = [
    {
        path: "login",
        name: "Login",
        meta: { requiresAuth: false },
        component: Login,
    },
    {
        path: "register",
        name: "Register",
        meta: { requiresAuth: false },
        component: Register,
    },
];

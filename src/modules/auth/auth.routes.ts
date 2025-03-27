import type { RouteRecordRaw } from "vue-router";

import Register from "./view/register.vue";
import Login from "./view/login.vue";

export const authRoutes: RouteRecordRaw[] = [
    {
        path: "login",
        name: "Login",
        component: Login,
    },
    {
        path: "register",
        name: "Register",
        component: Register,
    },
];

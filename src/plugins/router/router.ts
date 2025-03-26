import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

import { authRoutes } from "@/modules/auth/auth.routes";
import FullPageContent from "@/layout/full-page-content.vue";
import Home from "@/views/home.vue";
import SideBarContent from "@/layout/side-bar-content.vue";
import Student from "@/views/student.vue";



const routes: RouteRecordRaw[] = [
    {
        path: "",
        component: SideBarContent,
        redirect: "/student",
        children: [
            {
                path: "student",
                name: "Student",
                component: Student,
            },
            {
                path: "home",
                name: "Home",
                component: Home,
            },
        ],
    },
    {
        path: "/auth",
        component: FullPageContent,
        redirect: "auth/login",
        children: [...authRoutes],
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;

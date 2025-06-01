import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

import { authRoutes } from "@/modules/auth/auth.routes";
import FullPageContent from "@/layout/full-page-content.vue";

import SideBarContent from "@/layout/side-bar-content.vue";
import Student from "@/views/student.vue";
import { CourseRoutes } from "@/modules/course/course.routes";
import { authMiddleware } from "@/modules/auth/auth.middleware";
import { ActivityRoutes } from "@/modules/activity/activity.routes";

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
            ...CourseRoutes,
            ...ActivityRoutes,
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

router.beforeEach(authMiddleware);

export default router;

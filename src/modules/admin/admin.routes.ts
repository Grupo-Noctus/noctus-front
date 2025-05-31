import type { RouteRecordRaw } from "vue-router";
import Admin from "./views/admin.vue";
import { adminMiddleware } from "./admin.middleware";
import TCourses from "./views/courses.vue";
export const adminRoutes: RouteRecordRaw[] = [
    {
        path: "admin",
        name: "Admin",
        component: Admin,
        beforeEnter: adminMiddleware,
    },

    {
        path: "all-courses",
        name: "Courses",
        component: TCourses,
        beforeEnter: adminMiddleware,
    },
];

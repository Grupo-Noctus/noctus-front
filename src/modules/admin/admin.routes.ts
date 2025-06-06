import type { RouteRecordRaw } from "vue-router";
import Admin from "./views/admin.vue";
import { adminMiddleware } from "./admin.middleware";
import TCourses from "./views/courses.vue";
import EnrollmentCourses from "./views/enrollment-courses.vue";
import TModules from "./views/module/modules.vue";
import Enrollment from "./views/enrollment/envrollment.vue";
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
    {
        path: "all-courses/:id/modules",
        name: "Modules",
        component: TModules,
        props: true,
        beforeEnter: adminMiddleware,
    },
    {
        path: "all-course-enrollment",
        name: "CourseEnrollment",
        component: EnrollmentCourses,
        beforeEnter: adminMiddleware,
    },
    {
        path: "all-course-enrollment/:id",
        name: "Enrollment",
        component: Enrollment,
        beforeEnter: adminMiddleware,
    },
];

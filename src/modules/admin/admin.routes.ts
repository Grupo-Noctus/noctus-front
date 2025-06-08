import type { RouteRecordRaw } from "vue-router";
import Admin from "./views/admin.vue";
import { adminMiddleware } from "./admin.middleware";
import TCourses from "./views/courses.vue";
import TModules from "./views/module/modules.vue";
import ManagementMaterialDetaild from "./management-material/management-material-detaild.vue";
import ManagementMaterial from "./management-material/management-material.vue";


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
        path: "management-material",
        name: "ManagementMaterial",
        component: ManagementMaterial,
        props: true,
        beforeEnter: adminMiddleware,
    },
    {
        path: "management-material/:id/materials",
        name: "ManagementMaterialDetaild",
        component: ManagementMaterialDetaild,
        props: true,
        beforeEnter: adminMiddleware,
    },
];

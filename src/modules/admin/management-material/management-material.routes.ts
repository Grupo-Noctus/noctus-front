import type { RouteRecordRaw } from "vue-router";
import ManagementMaterial from "./management-material.vue";
import { adminMiddleware } from "../admin.middleware";

export const managementMaterialRoutes: RouteRecordRaw[] = [
    {
        path: "/management-material",
        name: "ManagementMaterial",
        component: ManagementMaterial,
        props: true,
        beforeEnter: adminMiddleware,
    },
];

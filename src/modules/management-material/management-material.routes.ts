import type { RouteRecordRaw } from "vue-router";
import ManagementMaterial from "./management-material.vue";



export const managementMaterialRoutes: RouteRecordRaw[] = [
    {
        path: "management-material",
        name: "ManagementMaterial",
        component: ManagementMaterial,
        props: true,
    },
];

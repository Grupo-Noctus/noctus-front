import type { RouteRecordRaw } from "vue-router";
import DetailCourse from "./views/detail-course.vue";
import materialVue from "../material/views/material.vue";


export const courseRoutes: RouteRecordRaw[] = [
    {
        path: "courses/:id/detail",
        name: "CourseDetail",
        component: DetailCourse,
        props: true,
    },
    {
        path: "courses/:id/material",
        name: "Material",
        component: materialVue,
        props: true,
    }
];

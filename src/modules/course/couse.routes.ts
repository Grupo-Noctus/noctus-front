import type { RouteRecordRaw } from "vue-router";
import DetailCourse from "./views/detail-course.vue";

export const courseRoutes: RouteRecordRaw[] = [
    {
        path: "courses/:id/detail",
        name: "CourseDetail",
        component: DetailCourse,
        props: true,
    },
];

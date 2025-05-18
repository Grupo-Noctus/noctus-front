import type { RouteRecordRaw } from "vue-router";
import DetailCourse from "./views/detail-course.vue";

export const CourseRoutes: RouteRecordRaw[] = [
    {
        path: "course/:id/detail",
        name: "Detail",
        component: DetailCourse,
    },
];

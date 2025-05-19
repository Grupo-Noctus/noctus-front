import type { RouteRecordRaw } from "vue-router";
import DetailCourse from "./views/detail-course.vue";

export const CourseRoutes: RouteRecordRaw[] = [
    {
        path: "student/course/:id/detail",
        name: "CourseDetail",
        component: DetailCourse,
    },
];

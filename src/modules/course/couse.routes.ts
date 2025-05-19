import type { RouteRecordRaw } from "vue-router";
import CoursePlayerVideo from "./components/course-player-video.vue";
import Courses from "./views/courses.vue";

export const courseRoutes: RouteRecordRaw[] = [
    {
        path: "courses/:id/detail",
        name: "CourseDetail",
        component: CoursePlayerVideo,
        props: true,
    },
];

import type { RouteRecordRaw } from "vue-router";
import ActivityInitial from "./view/activity-initial.vue";
import ActivityForm from "./view/activity-form.vue";
import ActivityCompleted from "./view/activity-completed.vue";


export const ActivityRoutes: RouteRecordRaw[] = [
    {
        path: "student/course/:courseId/activity",
        name: "ActivityInitial",
        component: ActivityInitial,
        props: true,
    },
    {
        path: "student/course/:courseId/activity/activity-form",
        name: "ActivityForm",
        component: ActivityForm,
        props: true,
    },
    {
        path: "student/course/:courseId/activity/activity-completed",
        name: "ActivityCompleted",
        component: ActivityCompleted,
        props: true,
    },
];

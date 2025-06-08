import type { RouteRecordRaw } from "vue-router";
import ActivityInitial from "./view/activity-initial.vue";
import ActivityForm from "./view/activity-form.vue";
import ActivityCompleted from "./view/activity-completed.vue";

export const ActivityRoutes: RouteRecordRaw[] = [
    {
        path: "course/:courseId/activity/:moduleId",
        name: "ActivityInitial",
        component: ActivityInitial,
        props: true,
    },
    {
        path: "course/:courseId/activity/activity-form/:moduleId",
        name: "ActivityForm",
        component: ActivityForm,
        props: true,
    },
    {
        path: "course/:courseId/activity/activity-completed/:moduleId",
        name: "ActivityCompleted",
        component: ActivityCompleted,
        props: true,
    },
];

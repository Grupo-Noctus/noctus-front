import type { RouteRecordRaw } from "vue-router";
import certificateVue from "@/modules/certificate/views/certificate.vue";

export const certificateRoutes: RouteRecordRaw[] = [
    {
        path: "courses/:id/detail/enrollment/:enrollmentId",
        name: "UploadCertificate",
        component: certificateVue,
        props: true,
    },
];

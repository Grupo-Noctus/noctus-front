import type { RouteRecordRaw } from "vue-router";
import certificateVue from "../certificate/views/certificate.vue";

export const certificateRoutes: RouteRecordRaw[] = [
    {
        path: "courses/:id/detail/enrollment/:idEnrollment",
        name: "UploadCertificate",
        component: certificateVue,
        props: true,
    }

];

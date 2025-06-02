import { AuthHttp } from "@/modules/auth/auth.http";
import { api } from "./api";
import { CourseHttp } from "@/modules/course/course.http";
import { AdminHttp } from "@/modules/admin/admin.http";

export const authHttp = new AuthHttp(api);
export const courseHttp = new CourseHttp(api);
export const adminHttp = new AdminHttp(api);

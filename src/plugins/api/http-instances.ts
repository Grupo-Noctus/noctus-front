import { AuthHttp } from "@/modules/auth/auth.http";
import { api } from "./api";

export const authHttp = new AuthHttp(api);

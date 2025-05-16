// src/plugins/router/middleware/auth.middleware.ts
import { useAuthStore } from "@/modules/auth/auth.store";

export function authMiddleware(to: any, from: any, next: any) {
    const authStore = useAuthStore();
    authStore.refetchCurrentUser();
    const token = authStore.token;

    debugger;
    const isPublicRoute = to.name === "Login" || to.name === "Register";

    if (token && (to.name === "Login" || to.name === "Register")) {
        return next({ name: "Student" });
    }

    if (!token && !isPublicRoute) {
        return next({ name: "Login" });
    }

    return next();
}

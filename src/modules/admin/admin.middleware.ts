import { useAuthStore } from "@/modules/auth/auth.store";

export function adminMiddleware(to: any, from: any, next: any) {
    const authStore = useAuthStore();
    authStore.refetchCurrentUser();

    if (authStore.user.role !== "ADMIN") {
        return next({ name: "Student" });
    }

    return next();
}

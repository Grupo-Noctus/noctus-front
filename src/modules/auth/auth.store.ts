import { defineStore } from "pinia";
import { ref } from "vue";
import { AuthService } from "./auth.service";
import router from "@/plugins/router/router";

export const useAuthStore = defineStore("auth", () => {
    const token = ref(localStorage.getItem("authToken") || "");
    const isLogIn = ref(false);
    const useAuthService = AuthService();
    // tipar
    const user = ref();

    async function loginStore(email: string, password: string) {
        try {
            const response = await useAuthService.loginService(email, password);

            if (!response) {
                router.push({ name: "Login" });
            }

            isLogIn.value = true;
            token.value = response.access_token;

            router.push({ name: "Student" });
        } catch (error) {
            user.value = null;
            throw error;
        }
    }

    return { token, loginStore };
});

import { ref } from "vue";
import { AuthService } from "./auth.service";
import router from "@/plugins/router/router";
import { defineStore } from "pinia";
import type { TUser } from "./auth.types";

export const useAuthStore = defineStore("auth", () => {
    const token = ref<string | null>(localStorage.getItem("token") || "");
    const isLogIn = ref<boolean>(false);

    const user = ref<TUser>({
        name: "",
        email: "",
        username: "",
        phoneNumber: "",
        acessToken: "",
        role: "",
        image: "",
    });
    const useAuthService = AuthService();

    async function loginStore(email: string, password: string) {
        try {
            const response = await useAuthService.loginService(email, password);

            if (!response) {
                router.push({ name: "Login" });
                return;
            }

            isLogIn.value = true;
            token.value = response.access_token;
            localStorage.setItem("token", response.access_token);
            if (response.access_token) {
                user.value = response.user;
                localStorage.setItem("user", JSON.stringify(response.user));
                router.push({ name: "Student" });
            }
            return;
        } catch (error) {
            user.value = {
                name: "",
                email: "",
                username: "",
                phoneNumber: "",
                acessToken: "",
                role: "",
                image: "",
            };
            throw error;
        }
    }
    async function refetchCurrentUser() {
        try {
            if (token.value && user.value) {
                return;
            }
            const localStorageUserData = localStorage.getItem("user");
            const localStorageJwtToken = localStorage.getItem("token");

            if (localStorageUserData && localStorageJwtToken) {
                const parsedUserData = JSON.parse(localStorageUserData);

                user.value = parsedUserData;
                token.value = localStorageJwtToken;
            } else {
                throw error;
            }
        } catch (error) {
            user.value = {
                name: "",
                email: "",
                username: "",
                phoneNumber: "",
                acessToken: "",
                role: "",
                image: "",
            };
            //token.value = "";
        }
    }

    return { token, loginStore, user, refetchCurrentUser };
});

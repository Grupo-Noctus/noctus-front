import { useAuthStore } from "@/modules/auth/auth.store";
import axios from "axios";

export const logOut = (navigateTo: string = "auth/login") => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = navigateTo;
};

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 1000 * 60 * 5,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const authStore = useAuthStore();
        if (error.response && error.response.status === 401) {
            authStore.user = {
                sub: null,
                name: "",
                email: "",
                username: "",
                role: "",
                image: null,
                active: null,
            };
            authStore.token = "";

            if (!window.location.href.endsWith("/auth/login")) {
                logOut();
            }

            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }

        return Promise.reject(error);
    },
);

api.interceptors.request.use(
    async (config) => {
        const isPublicRoute = config.headers.isPublic;

        if (isPublicRoute) {
            return config;
        }

        const authStore = useAuthStore();
        const userToken = localStorage.getItem("token");

        if (!userToken) {
            window.location.href = "/auth/login";
            throw new axios.Cancel("Usuário não autenticado");
        }

        await authStore.refetchCurrentUser();
        const token = authStore.token;

        if (!token) {
            logOut();
            throw new axios.Cancel("Usuário não autenticado");
        }
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

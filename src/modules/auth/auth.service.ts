import { authHttp } from "@/plugins/api/http-instances";
import { pushMessageNotification } from "@/utils/notivue-base";
import type { TRegisterFormDataTest } from "./auth.types";
pushMessageNotification;

export const AuthService = () => {
    const loginService = async (usernameOrEmail: string, password: string) => {
        try {
            const data = await authHttp.loginHttp(usernameOrEmail, password);

            localStorage.setItem("authToken", data.acess_token);
            // localStorage.setItem("authToken", data.user); caso venha informação do usuário

            return data;
        } catch (error) {
            console.error(error);
            if (error.response.status == 401) {
                pushMessageNotification({
                    type: "error",
                    title: "Erro na autenticação",
                    message: "Login inválido.",
                    duration: 3000,
                });
                console.error(error);
            } else if (error.request) {
                console.error(error);
                pushMessageNotification({
                    type: "error",
                    title: "Erro de conexão",
                    message: "Não foi possível se conectar ao servidor.",
                    duration: 3000,
                });
            } else {
                console.error(error);
                pushMessageNotification({
                    type: "error",
                    title: "Erro inesperado",
                    message: "Ocorreu um erro inesperado. Tente novamente.",
                    duration: 3000,
                });
            }
        }
    };

    const registerService = async (formData: TRegisterFormDataTest) => {
        try {
            const data = await authHttp.registerHttp(formData);
            return data;
        } catch (error) {
            if (error.response.status == 401) {
                console.error(error);
                pushMessageNotification({
                    type: "error",
                    title: "Erro na autenticação",
                    message:
                        "Dados inválidos. Por favor, verifique as informações enviadas e tente novamente.",
                    duration: 3000,
                });
            } else if (error.request) {
                console.error(error);
                pushMessageNotification({
                    type: "error",
                    title: "Erro de conexão",
                    message: "Não foi possível se conectar ao servidor.",
                    duration: 3000,
                });
            } else {
                console.error(error);
                pushMessageNotification({
                    type: "error",
                    title: "Erro inesperado",
                    message: "Ocorreu um erro inesperado. Tente novamente.",
                    duration: 3000,
                });
            }
        }
    };

    return { loginService, registerService };
};

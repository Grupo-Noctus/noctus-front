import { authHttp } from '@/plugins/api/http-instances';
import { pushMessageNotification } from "@/utils/notivue-base";
pushMessageNotification;

export const AuthService  = () => {

    const loginService = async( usernameOrEmail: string, password: string ) => {
        try {
          const data = await authHttp.loginHttp(usernameOrEmail, password)
          return data;
        } catch (error) {
          if (error.response.status === 401) {
            pushMessageNotification({
              type: "error",
              title: "Erro na autenticação",
              message: "Login inválido.",
              duration: 3000,
            });
          } else if (error.request) {
            pushMessageNotification({
              type: "error",
              title: "Erro de conexão",
              message: "Não foi possível se conectar ao servidor.",
              duration: 3000,
            });
            //resposta de outros erros
          } else {
            pushMessageNotification({
              type: "error",
              title: "Erro inesperado",
              message: "Ocorreu um erro inesperado. Tente novamente.",
              duration: 3000,
            });
          }
        }
      }

      const registerService = async( formData: string ) => {
        try {
          const data = await authHttp.registerHttp(formData)
          return data;
        } catch (error) {
          if (error.response) {
            pushMessageNotification({
              type: "error",
              title: "Erro na autenticação",
              message: error.response.data.message,
              duration: 3000,
            });
    
            //erro de conexão
          } else if (error.request) {
            pushMessageNotification({
              type: "error",
              title: "Erro de conexão",
              message: "Não foi possível se conectar ao servidor.",
              duration: 3000,
            });
    
            //outros erros
          } else {
            pushMessageNotification({
              type: "error",
              title: "Erro inesperado",
              message: "Ocorreu um erro inesperado. Tente novamente.",
              duration: 3000,
            });
        }
      }
    }

    return { loginService, registerService }

}


  
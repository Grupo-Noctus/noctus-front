
import { courseHttp } from "@/plugins/api/http-instances";
import { pushMessageNotification } from "@/utils/notivue-base";
  pushMessageNotification;

export const CourseService  = () => {
    const getCourseService = async() => {
        try {
          const data = await courseHttp.getCourseHttp()
          return data;
        } catch (error) {
        pushMessageNotification({
          type: "error",
          title: "Erro!",
          message: "Nenhum curso encontrado :(!",
          duration: 3000,
      });
        }
      }
    return{getCourseService}



  }

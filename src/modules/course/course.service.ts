
import { courseHttp } from "@/plugins/api/http-instances";

export const CourseService  = () => {
    const getCourseService = async() => {
        try {
          const data = await courseHttp.getCourseHttp()
          return data;
        } catch (error) {
          throw new Error("Erro ao buscar os cursos: " + error);
        }
      }
    return{getCourseService}



  }

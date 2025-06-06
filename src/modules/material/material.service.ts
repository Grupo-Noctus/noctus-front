import { pushMessageNotification } from "@/utils/notivue-base";
import type { TMaterial } from "./material.types";
import { materialHttp } from "@/plugins/api/http-instances";


export const MaterialService = () => {
    async function getMaterialsByCourseIdService( courseId : number) : Promise <TMaterial[] | [] >  {
        try {
            const data = await materialHttp.getMaterialsByCourseIdHttp(courseId)
            return data
        } catch (error) {
                pushMessageNotification({
                type: "error",
                title: "Erro!",
                message: "Nenhum material encontrado :(!",
                duration: 3000,
            });
            console.error( error )
            return[]
        }

    }

  return { getMaterialsByCourseIdService }


  }

import type { AxiosInstance } from "axios";

export class CourseHttp {
   constructor(private readonly httpClient: AxiosInstance) {
           this.httpClient = httpClient;
       }

    async getCourseHttp(){
        const {data} = await this.httpClient.get("/course/find-many", {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoidGhheW1hdGVyYSIsInJvbGUiOiJBRE1JTiIsImFjdGl2ZSI6dHJ1ZSwiaWF0IjoxNzQ2NzUxMTQ0LCJleHAiOjE3NDY3NTQ3NDR9.u5AHyeT9vP-EBPF3yq2Vococ8rP32qwOJrP1Ou8o0iE`,
            },
        });

        return data;
    }



 }

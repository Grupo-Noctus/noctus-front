import type { AxiosInstance } from "axios";

export class CourseHttp {
   constructor(private readonly httpClient: AxiosInstance) {
           this.httpClient = httpClient;
       }

    async getCourseHttp(){
        const {data} = await this.httpClient.get("/courses");

        return data;
    }



 }

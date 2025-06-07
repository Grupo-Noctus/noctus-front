import type { AxiosInstance } from "axios";
import type { TMaterial } from "./material.types";

export class MaterialHttp {

   constructor(private readonly httpClient: AxiosInstance)  {
    this.httpClient = httpClient;
  }

  async getMaterialsByCourseIdHttp(courseId: number) : Promise <TMaterial[]>  {
    const { data } = await this.httpClient.get(`/material/find-many/${courseId}`);
    return data as TMaterial[];
  }

}

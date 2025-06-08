import type { TContentModule } from "../course/course.types";

export type TCourses = {
    id: number;
    name: string;
    description: string;
    image: string;
    durationInDays: 21;
    modules: TContentModule[];
};

export type TCreateCourseData = {
    name: string;
    description: string;
    duration: number;
    imageCourse: File | null;
};

export type TCreateModuleData = {
    name: string;
    description: string;
    id?: number;
};

export type TContentVideoModule = {
    id?: number;
    name: string;
    description: string;
    video?: File | null;
    viewed?: boolean;
};

export type TCreateContentData = {
    name: string;
    description: string;
    video: File | null;
    id?: number;
};

export type TMaterial = {
    id: number;
    name: string;
    description: string;
    link: string;
    type: string;
    courseId: number;
    file?: File | null;
};

export type TCreateMaterial = {
    name: string;
    description: string;
    link: string;
    type: string;
    courseId: number;
    file?: File | null;
};

export type TContentMaterial = {
    name: string;
    description: string;
    link: string;
    type: string;
    courseId: number;
    file?: File | null;
};

export type TEnrollment = {
    idUser: number;
    username: string;
    name: string;
    email: string;
    phoneNumber: string;
    idStudent: number;
    dateBirth: string;
    state: string;
    ethnicity: string;
    gender: string;
    hasDisability: boolean;
    disabilityType: string;
    needsSupportResources: boolean;
    supportResourcesDescription: string;
    idCourse: number;
    nameCourse: string;
    idEnrollment: number;
    completed: boolean;
    expiresAt: string;
};

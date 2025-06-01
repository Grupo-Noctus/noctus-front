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

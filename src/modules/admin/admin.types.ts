export type TCourses = {
    id: number;
    name: string;
    description: string;
    image: string;
    durationInDays: 21;
};

export type TCreateCourseData = {
    name: string;
    description: string;
    duration: number;
    image: File | null;
};

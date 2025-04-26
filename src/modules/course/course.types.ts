export type TContentModule = {
    order: number;
    name: string;
    description: string;
    content: TContentVideoModule[];
};

export type TContentVideoModule = {
    id: number;
    name: string;
    description: string;
    duration: number;
    order: number;
};

export type TContentExam = {
    id: number;
    name: string;
    questionCount: number;
};

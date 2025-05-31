export type TContentModule = {
    id: number;
    order: number;
    name: string;
    description: string;
    videos: TContentVideoModule[];
};

export type TSelectedContent = {
    id: number;
    order: number;
    name: string;
    description: string;
    content: TContentVideoModule;
};

export type TContentVideoModule = {
    id: number;
    name: string;
    description: string;
    duration: number;
    order: number;
    idProgressVideo: number | null;
    viewed: boolean;
};

export type TContentExam = {
    id: number;
    name: string;
    questionCount: number;
    checked: boolean;
};

export type TVskipContent = {
    moduleId: number;
    contentOrder: number;
    nextModuleOrder: number | null;
    nextContentOrder: number | null;
    prevModuleOrder: number | null;
    prevContentOrder: number | null;
};

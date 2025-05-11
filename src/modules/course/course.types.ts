export type TContentModule = {
    id: number;
    order: number;
    name: string;
    description: string;
    content: TContentVideoModule[];
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
    checked: boolean;
};

export type TContentExam = {
    id: number;
    name: string;
    questionCount: number;
};

export type TVskipContent = {
    moduleId: number;
    contentOrder: number;
    nextModuleOrder: number | null;
    nextContentOrder: number | null;
    prevModuleOrder: number | null;
    prevContentOrder: number | null;
};

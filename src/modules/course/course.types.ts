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
    idProgressVideo: number | null;
    viewed: number | null;
};

export type TContentExam = {
    id: number;
    name: string;
    questionCount: number;
    checked: boolean;
};

export type TVskipContent = {
    moduleId: number;
    contentId: number;
    nextModuleId: number | null;
    nextContentId: number | null;
    prevModuleId: number | null;
    prevContentId: number | null;
};

export type exam = {
    id: number;
    idModule: number;
    title: string;
    description: string;
    questions: question[];
};

export type question = {
    id: number;
    idExam: number;
    questionText: string;
    type: string;
    order: number;
    options: option[];
};

export type option = {
    id: number;
    idQuestion: number;
    optionText: string;
    correct: boolean;
};

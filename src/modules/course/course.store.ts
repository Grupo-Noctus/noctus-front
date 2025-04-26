import { defineStore } from "pinia";
import type { TContentExam, TContentModule } from "./course.types";

export const useCourseStore = defineStore("courseStore", () => {
    const contentModule: TContentModule[] = [
        {
            order: 1,
            name: "primo pobre",
            description: "this videos cover the basics os nestJS framework",
            content: [
                {
                    id: 1,
                    name: "Introduction to NestJS",
                    description: "This video covers the basics of NestJS framework.",
                    duration: 3600,
                    order: 1,
                },
                {
                    id: 2,
                    name: "Infusion ground",
                    description: "Who stop the rain",
                    duration: 2600,
                    order: 2,
                },
            ],
        },
        {
            order: 2,
            name: "da cabeça aos pés",
            description: "covers nothing",
            content: [
                {
                    id: 1,
                    name: "Introduction to NestJS",
                    description: "This video covers the basics of NestJS framework.",
                    duration: 3600,
                    order: 1,
                },
            ],
        },
        {
            order: 3,
            name: "fonificação de porta",
            description: "Tralallelo trallala",
            content: [
                {
                    id: 1,
                    name: "Introduction to NestJS",
                    description: "This video covers the basics of NestJS framework.",
                    duration: 37,
                    order: 1,
                },
            ],
        },
    ];

    const contentExam: TContentExam[] = [
        {
            id: 1,
            name: "Prova final",
            questionCount: 7,
        },
        {
            id: 2,
            name: "Prova média",
            questionCount: 5,
        },
    ];
    const getContentModule = async (): Promise<TContentModule[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(contentModule);
            }, 1000);
        });
    };

    const getContentExam = async (): Promise<TContentExam[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(contentExam);
            }, 1000);
        });
    };

    return { getContentModule, getContentExam, contentModule };
});

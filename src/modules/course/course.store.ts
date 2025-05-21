import { ref } from "vue";
import { defineStore } from "pinia";

import { pushMessageNotification } from "@/utils/notivue-base";

import type { TContentExam, TContentModule, TSelectedContent, TVskipContent } from "./course.types";

export const useCourseStore = defineStore("courseStore", () => {
    const videoUrlList: { contentId: number; moduleId: number; url: string }[] = [
        {
            contentId: 0,
            moduleId: 0,
            url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
        },
        {
            contentId: 1,
            moduleId: 0,
            url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        },
        {
            contentId: 0,
            moduleId: 1,
            url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        },
    ];

    const contentExam: TContentExam[] = [
        {
            id: 1,
            name: "Prova final",
            questionCount: 7,
            checked: true,
        },
        {
            id: 2,
            name: "Prova média",
            questionCount: 5,
            checked: false,
        },
    ];

    const contentModule = ref<TContentModule[]>([
        {
            id: 0,
            order: 1,
            name: "Introdução",
            description: "Esta seção cobre os conceitos básicos do framework NestJS.",
            content: [
                {
                    id: 0,
                    name: "Instalação e uso da CLI",
                    description:
                        "Aprenda a instalar e utilizar a CLI do NestJS para gerar projetos e recursos.",
                    duration: 600,
                    idProgressVideo: 0,
                    viewed: 90,
                },
                {
                    id: 1,
                    name: "Configuração Inicial",
                    description:
                        "Configurações iniciais do projeto NestJS, incluindo estrutura e arquivos principais.",
                    duration: 900,
                    idProgressVideo: 1,
                    viewed: 99,
                },
            ],
        },
        {
            id: 1,
            order: 2,
            name: "Fundamentos",
            description: "Seção dedicada à compreensão dos pilares do NestJS.",
            content: [
                {
                    id: 0,
                    name: "Providers Personalizados",
                    description:
                        "Como criar e utilizar providers personalizados para injeção de dependência.",
                    duration: 800,
                    idProgressVideo: 0,
                    viewed: 100,
                },
                {
                    id: 1,
                    name: "Módulos",
                    description: "Entenda a importância dos módulos na arquitetura do NestJS.",
                    duration: 720,
                    idProgressVideo: null,
                    viewed: null,
                },
            ],
        },
        {
            id: 2,
            order: 3,
            name: "Técnicas",
            description: "Técnicas intermediárias e avançadas para projetos mais robustos.",
            content: [
                {
                    id: 0,
                    name: "Cache",
                    description:
                        "Aprenda a aplicar caching para melhorar a performance das aplicações.",
                    duration: 600,
                    idProgressVideo: null,
                    viewed: null,
                },
                {
                    id: 1,
                    name: "Validação e Pipes",
                    description: "Utilizando pipes para transformar e validar dados nas rotas.",
                    duration: 780,
                    idProgressVideo: null,
                    viewed: null,
                },
            ],
        },
        {
            id: 3,
            order: 4,
            name: "Banco de Dados",
            description: "Integrações com diferentes bancos de dados usando o NestJS.",
            content: [
                {
                    id: 0,
                    name: "Prisma",
                    description: "Integração com o ORM Prisma para manipulação de banco de dados.",
                    duration: 900,
                    idProgressVideo: null,
                    viewed: null,
                },
                {
                    id: 1,
                    name: "MySQL",
                    description: "Conectando e realizando operações com MySQL.",
                    duration: 800,
                    idProgressVideo: null,
                    viewed: null,
                },
                {
                    id: 2,
                    name: "MongoDB",
                    description: "Utilizando MongoDB com Mongoose no NestJS.",
                    duration: 850,
                    idProgressVideo: null,
                    viewed: null,
                },
            ],
        },
        {
            id: 4,
            order: 5,
            name: "WebSockets",
            description: "Implementando comunicação em tempo real com WebSockets.",
            content: [
                {
                    id: 0,
                    name: "Configuração",
                    description: "Como configurar WebSockets em um projeto NestJS.",
                    duration: 700,
                    idProgressVideo: null,
                    viewed: null,
                },
                {
                    id: 1,
                    name: "Exercício Prático",
                    description: "Construindo uma aplicação de chat em tempo real com WebSockets.",
                    duration: 900,
                    idProgressVideo: null,
                    viewed: null,
                },
            ],
        },
        {
            id: 5,
            order: 6,
            name: "Testes",
            description: "Criação de testes para garantir a qualidade da aplicação.",
            content: [
                {
                    id: 0,
                    name: "Testes Unitários",
                    description: "Como escrever testes unitários usando Jest no NestJS.",
                    duration: 600,
                    idProgressVideo: null,
                    viewed: null,
                },
                {
                    id: 1,
                    name: "Testes de Integração",
                    description: "Testando a integração entre os módulos e serviços.",
                    duration: 750,
                    idProgressVideo: null,
                    viewed: null,
                },
            ],
        },
        {
            id: 6,
            order: 7,
            name: "Autenticação e Autorização",
            description: "Segurança na aplicação com autenticação e controle de acesso.",
            content: [
                {
                    id: 0,
                    name: "JWT e Guardas",
                    description: "Como usar JWT e Guards para proteger rotas.",
                    duration: 780,
                    idProgressVideo: null,
                    viewed: null,
                },
                {
                    id: 1,
                    name: "Login com Sessões",
                    description: "Outra abordagem para autenticação usando sessões.",
                    duration: 840,
                    idProgressVideo: null,
                    viewed: null,
                },
            ],
        },
    ]);

    const courseVideoUrl = ref();
    const isLoadingContent = ref();
    const isLoadingContentTab =
        ref(
            true,
        ); /*alonside with isLoadingContent variable, it was necessary to add other loading because could not handle controlling just one.*/

    const selectedContent = ref<TSelectedContent>({
        id: 0,
        order: 0,
        name: "",
        description: "",
        content: {
            id: 0,
            name: "",
            description: "",
            duration: 0,
            idProgressVideo: null,
            viewed: null,
        },
    });

    const skipContent = ref<TVskipContent>({
        moduleId: 0,
        contentId: 0,
        prevModuleId: null,
        nextContentId: null,
        nextModuleId: null,
        prevContentId: null,
    });

    const getNavigation = (moduleId: number, contentId: number): TVskipContent => {
        const result: TVskipContent = {
            moduleId,
            contentId,
            prevModuleId: null,
            prevContentId: null,
            nextModuleId: null,
            nextContentId: null,
        };

        const currentModule = contentModule.value.find((module) => module.id === moduleId);
        if (!currentModule) {
            setSelectedContent();
            pushMessageNotification({
                type: "error",
                title: "Erro ao selecionar o vídeo",
                message: "tente novamente mais tarde",
                props: {
                    progress: true,
                },
                duration: 3000,
            });
            return {
                moduleId: 0,
                contentId: 0,
                prevModuleId: null,
                nextContentId: null,
                nextModuleId: null,
                prevContentId: null,
            };
        }

        const currentContent = currentModule.content.find((content) => content.id === contentId);
        if (!currentContent) {
            console.error("Conteúdo não encontrado no módulo");
            setSelectedContent();
            pushMessageNotification({
                type: "error",
                title: "Erro ao selecionar o vídeo",
                message: "tente novamente mais tarde",
                props: {
                    progress: true,
                },
                duration: 3000,
            });
            return {
                moduleId: 0,
                contentId: 0,
                prevModuleId: null,
                nextContentId: null,
                nextModuleId: null,
                prevContentId: null,
            };
        }

        const moduleIndex = contentModule.value.findIndex((module) => module.id === moduleId);
        const contentIndex = contentModule.value.findIndex((content) => content.id === contentId);

        if (contentIndex > 0) {
            result.prevContentId = currentModule.content[contentIndex - 1].id;
            result.prevModuleId = moduleId;
        } else if (moduleIndex > 0) {
            const prevModule = contentModule.value[moduleIndex - 1];
            if (prevModule.content.length > 0) {
                result.prevModuleId = prevModule.id;
                result.prevContentId = prevModule.content[prevModule.content.length - 1].id;
            }
        }

        if (contentIndex < currentModule.content.length - 1) {
            result.nextContentId = currentModule.content[contentIndex + 1].id;
            result.nextModuleId = moduleId;
        } else if (moduleIndex < contentModule.value.length - 1) {
            const nextModule = contentModule.value[moduleIndex + 1];
            if (nextModule.content.length > 0) {
                result.nextModuleId = nextModule.id;
                result.nextContentId = nextModule.content[0].id;
            }
        }

        return result;
    };

    const getCourseVideoUrl = async (mode?: "next" | "prev") => {
        setIsLoadingContent(true);

        if (mode === "next") {
            setSelectedContentManual(
                skipContent.value.nextModuleId || 0,
                skipContent.value.nextContentId || 0,
            );
        } else if (mode === "prev") {
            setSelectedContentManual(
                skipContent.value.prevModuleId || 0,
                skipContent.value.prevContentId || 0,
            );
        }

        getNavigation(selectedContent.value.id, selectedContent.value.content.id);
        skipContent.value = getNavigation(
            selectedContent.value.id,
            selectedContent.value.content.id,
        );

        const filteredUrl = videoUrlList.filter(
            (e) =>
                selectedContent.value.id === e.moduleId &&
                selectedContent.value.content.id === e.contentId,
        );

        const givenUrl = await new Promise((resolve) => {
            setTimeout(() => {
                resolve(filteredUrl[0].url);
            }, 1000);
        });

        courseVideoUrl.value = givenUrl;
        setIsLoadingContent(false);
    };

    const getContentModule = async (): Promise<TContentModule[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(contentModule.value);
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

    const setIsLoadingContent = (value: boolean) => {
        isLoadingContent.value = value;
    };

    const setIsLoadingContentTab = (value: boolean) => {
        isLoadingContentTab.value = value;
    };

    const setSelectedContentManual = (givenModuleId: number, givenContentId: number) => {
        const moduleFound = contentModule.value.find((module) => module.id === givenModuleId);

        if (moduleFound) {
            const contentFound = moduleFound.content.find(
                (content) => content.id === givenContentId,
            );
            if (contentFound) {
                selectedContent.value = {
                    id: moduleFound.id,
                    order: moduleFound.order,
                    name: moduleFound.name,
                    description: moduleFound.description,
                    content: {
                        id: contentFound.id,
                        name: contentFound.name,
                        description: contentFound.description,
                        duration: contentFound.duration,
                        idProgressVideo: contentFound.idProgressVideo,
                        viewed: contentFound.viewed,
                    },
                };
                return;
            }
        }

        return {
            id: 0,
            order: 0,
            name: "",
            description: "",
            content: {
                id: 0,
                name: "",
                description: "",
                duration: 0,
                idProgressVideo: null,
                viewed: null,
            },
        };
    };

    const setSelectedContent = () => {
        if (!contentModule.value || contentModule.value.length === 0) {
            return;
        }

        contentModule.value.forEach((e) => {
            e.content.forEach((c) => {
                if (c.viewed) {
                    selectedContent.value = {
                        id: e.id,
                        order: e.order,
                        name: e.name,
                        description: e.description,
                        content: {
                            id: c.id,
                            name: c.name,
                            description: c.description,
                            duration: c.duration,
                            idProgressVideo: c.idProgressVideo,
                            viewed: c.viewed,
                        },
                    };
                }
            });
        });

        if (
            selectedContent.value.content.id === 0 &&
            selectedContent.value.content.id === 0 &&
            selectedContent.value.id === 0 &&
            selectedContent.value.order === 0
        ) {
            const firstModule = contentModule.value[0];
            const firstContent = firstModule.content[0];

            selectedContent.value = {
                id: firstModule.id,
                order: firstModule.order,
                name: firstModule.name,
                description: firstModule.description,
                content: {
                    id: firstContent.id,
                    name: firstContent.name,
                    description: firstContent.description,
                    duration: firstContent.duration,
                    idProgressVideo: firstContent.idProgressVideo,
                    viewed: firstContent.viewed,
                },
            };
        }
    };

    return {
        contentModule,
        courseVideoUrl,
        isLoadingContent,
        isLoadingContentTab,
        selectedContent,
        skipContent,
        videoUrlList,
        getContentExam,
        getContentModule,
        getCourseVideoUrl,
        setIsLoadingContent,
        setIsLoadingContentTab,
        setSelectedContent,
        setSelectedContentManual,
    };
});

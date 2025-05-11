import { defineStore } from "pinia";
import type { TContentExam, TContentModule, TSelectedContent, TVskipContent } from "./course.types";
import { ref, watch } from "vue";
import { pushMessageNotification } from "@/utils/notivue-base";

export const useCourseStore = defineStore("courseStore", () => {
    const skipVideoList = ref<TVskipContent[]>([
        {
            moduleId: 0,
            contentOrder: 1,

            prevModuleOrder: null,
            prevContentOrder: null,

            nextContentOrder: 2,
            nextModuleOrder: 1,
        },
        {
            moduleId: 0,
            contentOrder: 2,

            prevModuleOrder: 1,
            prevContentOrder: 1,

            nextModuleOrder: 2,
            nextContentOrder: 1,
        },
        {
            moduleId: 1,
            contentOrder: 1,

            prevModuleOrder: 1,
            prevContentOrder: 2,

            nextModuleOrder: null,
            nextContentOrder: null,
        },
    ]);

    const skipVideo = ref<TVskipContent>({
        moduleId: 0,
        contentOrder: 0,
        prevModuleOrder: null,
        nextContentOrder: null,
        nextModuleOrder: null,
        prevContentOrder: null,
    });

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
                    order: 1,
                    checked: true,
                },
                {
                    id: 1,
                    name: "Configuração Inicial",
                    description:
                        "Configurações iniciais do projeto NestJS, incluindo estrutura e arquivos principais.",
                    duration: 900,
                    order: 2,
                    checked: false,
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
                    order: 1,
                    checked: false,
                },
                {
                    id: 1,
                    name: "Módulos",
                    description: "Entenda a importância dos módulos na arquitetura do NestJS.",
                    duration: 720,
                    order: 2,
                    checked: false,
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
                    order: 1,
                    checked: false,
                },
                {
                    id: 1,
                    name: "Validação e Pipes",
                    description: "Utilizando pipes para transformar e validar dados nas rotas.",
                    duration: 780,
                    order: 2,
                    checked: false,
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
                    order: 1,
                    checked: false,
                },
                {
                    id: 1,
                    name: "MySQL",
                    description: "Conectando e realizando operações com MySQL.",
                    duration: 800,
                    order: 2,
                    checked: false,
                },
                {
                    id: 2,
                    name: "MongoDB",
                    description: "Utilizando MongoDB com Mongoose no NestJS.",
                    duration: 850,
                    order: 3,
                    checked: false,
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
                    order: 1,
                    checked: false,
                },
                {
                    id: 1,
                    name: "Exercício Prático",
                    description: "Construindo uma aplicação de chat em tempo real com WebSockets.",
                    duration: 900,
                    order: 2,
                    checked: false,
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
                    order: 1,
                    checked: false,
                },
                {
                    id: 1,
                    name: "Testes de Integração",
                    description: "Testando a integração entre os módulos e serviços.",
                    duration: 750,
                    order: 2,
                    checked: false,
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
                    order: 1,
                    checked: false,
                },
                {
                    id: 1,
                    name: "Login com Sessões",
                    description: "Outra abordagem para autenticação usando sessões.",
                    duration: 840,
                    order: 2,
                    checked: false,
                },
            ],
        },
    ]);

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

    const selectedVideo = ref<TSelectedContent>({
        id: 0,
        order: 0,
        name: "",
        description: "",
        content: {
            id: 0,
            name: "",
            description: "",
            duration: 0,
            order: 0,
            checked: false,
        },
    });

    const courseVideoUrl = ref();

    const getCourseVideoUrl = async (order: number = 0, mode: string) => {
        if (mode === "next") {
            setSelectedContentManual(
                skipVideo.value.nextModuleOrder || 0,
                skipVideo.value.nextContentOrder || 0,
            );
        } else if (mode === "prev") {
            setSelectedContentManual(
                skipVideo.value.prevModuleOrder || 0,
                skipVideo.value.prevContentOrder || 0,
            );
        }

        skipVideo.value = getSkipInfo();

        // Resto do código...
        const filteredUrl = videoUrlList.filter(
            (e) =>
                selectedVideo.value.id === e.moduleId &&
                selectedVideo.value.content.id === e.contentId,
        );
        const givenUrl = await new Promise((resolve) => {
            setTimeout(() => {
                resolve(filteredUrl[0].url);
            }, 1000);
        });

        console.log("selectedVideo atualizado:", selectedVideo.value);
        courseVideoUrl.value = givenUrl;
    };

    const getSkipInfo = (): TVskipContent => {
        const selectedSkipContent = skipVideoList.value.find((e) => {
            if (
                e.moduleId === selectedVideo.value.id &&
                e.contentOrder === selectedVideo.value.content.order
            ) {
                return e;
            }
        });

        if (!selectedSkipContent) {
            setSelectedContent();
            pushMessageNotification({
                type: "error",
                title: "erro ao selecionar o vídeo",
                message: "tente novamente mais tarde",
                props: {
                    progress: true,
                },
                duration: 3000,
            });
            return skipVideo.value;
        }

        return selectedSkipContent;
    };

    const getContentModule = async (): Promise<TContentModule[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(contentModule.value);
            }, 1000);
        });
    };

    watch(skipVideo, (newValue, oldValue) => {
        console.log("foi atualizado. Valor antigo", oldValue);
        console.log("foi atualizado. Valor novo", newValue);
    });

    const getContentExam = async (): Promise<TContentExam[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(contentExam);
            }, 1000);
        });
    };

    const setSelectedContentManual = (givenModuleOrder: number, givenContentOrder: number) => {
        const moduleFound = contentModule.value.find(
            (module: number) => module.order === givenModuleOrder,
        );

        if (moduleFound) {
            const contentFound = moduleFound.content.find(
                (content: number) => content.order === givenContentOrder,
            );

            if (contentFound) {
                selectedVideo.value = {
                    id: moduleFound.id,
                    order: moduleFound.order,
                    name: moduleFound.name,
                    description: moduleFound.description,
                    content: {
                        id: contentFound.id,
                        name: contentFound.name,
                        description: contentFound.description,
                        duration: contentFound.duration,
                        order: contentFound.order,
                        checked: contentFound.checked,
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
                order: 0,
                checked: false,
            },
        };
    };

    const setSelectedContent = () => {
        if (!contentModule.value || contentModule.value.length === 0) {
            return;
        }

        contentModule.value.forEach((e) => {
            e.content.forEach((c) => {
                if (c.checked) {
                    selectedVideo.value = {
                        id: e.id,
                        order: e.order,
                        name: e.name,
                        description: e.description,
                        content: {
                            id: c.id,
                            name: c.name,
                            description: c.description,
                            duration: c.duration,
                            order: c.order,
                            checked: c.checked,
                        },
                    };
                }
            });
        });

        if (
            selectedVideo.value.content.id === 0 &&
            selectedVideo.value.content.order === 0 &&
            selectedVideo.value.id === 0 &&
            selectedVideo.value.order === 0
        ) {
            console.log(selectedVideo.value);
            const firstModule = contentModule.value[0];
            const firstContent = firstModule.content[0];

            selectedVideo.value = {
                id: firstModule.id,
                order: firstModule.order,
                name: firstModule.name,
                description: firstModule.description,
                content: {
                    id: firstContent.id,
                    name: firstContent.name,
                    description: firstContent.description,
                    duration: firstContent.duration,
                    order: firstContent.order,
                    checked: firstContent.checked,
                },
            };
        }
    };

    return {
        contentModule,
        courseVideoUrl,
        selectedVideo,
        videoUrlList,
        skipVideo,
        getContentModule,
        getContentExam,
        getCourseVideoUrl,
        getSkipInfo,
        setSelectedContent,
        setSelectedContentManual,
    };
});

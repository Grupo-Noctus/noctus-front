import { defineStore } from "pinia";
import type { TContentExam, TContentModule } from "./course.types";
import { ref } from "vue";

export const useCourseStore = defineStore("courseStore", () => {
    const contentModule: TContentModule[] = [
        {
            order: 1,
            name: "Introdução",
            description: "Esta seção cobre os conceitos básicos do framework NestJS.",
            content: [
                {
                    id: 1,
                    name: "Instalação e uso da CLI",
                    description:
                        "Aprenda a instalar e utilizar a CLI do NestJS para gerar projetos e recursos.",
                    duration: 600,
                    order: 1,
                },
                {
                    id: 2,
                    name: "Configuração Inicial",
                    description:
                        "Configurações iniciais do projeto NestJS, incluindo estrutura e arquivos principais.",
                    duration: 900,
                    order: 2,
                },
            ],
        },
        {
            order: 2,
            name: "Fundamentos",
            description: "Seção dedicada à compreensão dos pilares do NestJS.",
            content: [
                {
                    id: 1,
                    name: "Providers Personalizados",
                    description:
                        "Como criar e utilizar providers personalizados para injeção de dependência.",
                    duration: 800,
                    order: 1,
                },
                {
                    id: 2,
                    name: "Módulos",
                    description: "Entenda a importância dos módulos na arquitetura do NestJS.",
                    duration: 720,
                    order: 2,
                },
            ],
        },
        {
            order: 3,
            name: "Técnicas",
            description: "Técnicas intermediárias e avançadas para projetos mais robustos.",
            content: [
                {
                    id: 1,
                    name: "Cache",
                    description:
                        "Aprenda a aplicar caching para melhorar a performance das aplicações.",
                    duration: 600,
                    order: 1,
                },
                {
                    id: 2,
                    name: "Validação e Pipes",
                    description: "Utilizando pipes para transformar e validar dados nas rotas.",
                    duration: 780,
                    order: 2,
                },
            ],
        },
        {
            order: 4,
            name: "Banco de Dados",
            description: "Integrações com diferentes bancos de dados usando o NestJS.",
            content: [
                {
                    id: 1,
                    name: "Prisma",
                    description: "Integração com o ORM Prisma para manipulação de banco de dados.",
                    duration: 900,
                    order: 1,
                },
                {
                    id: 2,
                    name: "MySQL",
                    description: "Conectando e realizando operações com MySQL.",
                    duration: 800,
                    order: 2,
                },
                {
                    id: 3,
                    name: "MongoDB",
                    description: "Utilizando MongoDB com Mongoose no NestJS.",
                    duration: 850,
                    order: 3,
                },
            ],
        },
        {
            order: 5,
            name: "WebSockets",
            description: "Implementando comunicação em tempo real com WebSockets.",
            content: [
                {
                    id: 1,
                    name: "Configuração",
                    description: "Como configurar WebSockets em um projeto NestJS.",
                    duration: 700,
                    order: 1,
                },
                {
                    id: 2,
                    name: "Exercício Prático",
                    description: "Construindo uma aplicação de chat em tempo real com WebSockets.",
                    duration: 900,
                    order: 2,
                },
            ],
        },
        {
            order: 6,
            name: "Testes",
            description: "Criação de testes para garantir a qualidade da aplicação.",
            content: [
                {
                    id: 1,
                    name: "Testes Unitários",
                    description: "Como escrever testes unitários usando Jest no NestJS.",
                    duration: 600,
                    order: 1,
                },
                {
                    id: 2,
                    name: "Testes de Integração",
                    description: "Testando a integração entre os módulos e serviços.",
                    duration: 750,
                    order: 2,
                },
            ],
        },
        {
            order: 7,
            name: "Autenticação e Autorização",
            description: "Segurança na aplicação com autenticação e controle de acesso.",
            content: [
                {
                    id: 1,
                    name: "JWT e Guardas",
                    description: "Como usar JWT e Guards para proteger rotas.",
                    duration: 780,
                    order: 1,
                },
                {
                    id: 2,
                    name: "Login com Sessões",
                    description: "Outra abordagem para autenticação usando sessões.",
                    duration: 840,
                    order: 2,
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

    const courseVideoUrl = ref();

    const getCourseVideoUrl = async (
        url: string = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    ) => {
        const givenUrl = await new Promise((resolve) => {
            setTimeout(() => {
                resolve(url);
            }, 1000);
        });

        courseVideoUrl.value = givenUrl;
    };

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

    return { getContentModule, getContentExam, contentModule, getCourseVideoUrl, courseVideoUrl };
});

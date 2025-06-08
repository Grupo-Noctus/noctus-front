<template>
    <div class="completion-container h-100" color="secondary">
        <v-card class="card pa-5" color="secondary">
            <v-card-title class="title">
                {{ courseCompleted ? "Você concluiu o Curso!" : "Curso em Andamento" }}
            </v-card-title>

            <v-card-subtitle class="subtitle">
                {{
                    courseCompleted
                        ? "Sua dedicação ao aprendizado foi essencial para chegar até aqui. Agora, é com grande satisfação que apresentamos o seu certificado, reconhecimento oficial do seu esforço e progresso. Que ele seja um marco na sua jornada e inspire você a continuar evoluindo!"
                        : "Você ainda está em progresso no curso. Continue se dedicando e retorne quando concluir para receber seu certificado!"
                }}
            </v-card-subtitle>
            <div v-if="courseCompleted" class="card-modules-wrapper">
                <v-card class="card-module" :disabled="isLoading" @click="acessCertificatePage">
                    <v-card-title class="card-module-title">
                        <span class="mdi mdi-certificate-outline me-1"></span>
                        <span v-if="!isLoading">certificado</span>
                        <span v-else>Gerando...</span>
                    </v-card-title>
                    <v-card-subtitle class="card-module-subtitle">
                        <span v-if="!isLoading">Clique aqui para gerar o certificado</span>
                        <span v-else> Aguarde uns segundos... </span>
                    </v-card-subtitle>
                </v-card>
            </div>

            <v-btn class="return-button" :disabled="isLoading" @click="returnStudentPage">
                Retornar para a tela inicial
            </v-btn>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import router from "@/plugins/router/router";
import { useRoute } from "vue-router";
import { CertificateService } from "../certificate.service";
import { computed, onMounted, ref } from "vue";
import type { CourseByEnrollment } from "../../../modules/course/course.types";
import { CourseService } from "../../../modules/course/course.service";

const courseService = CourseService();
const certificateService = CertificateService();
const route = useRoute();
const isLoading = ref(false);

const courseData = ref<CourseByEnrollment[]>([]);
const courseCompleted = ref(false);

const courseId = computed(() => route.params.id);

onMounted(() => {
    fetchCourseData();
});

const fetchCourseData = async () => {
    courseData.value = await courseService.getCourseByEnrollmentService();
    const filteredCourse = courseData.value.find((course) => course.idCourse === +courseId.value);
    if (filteredCourse?.completed) {
        courseCompleted.value = true;
    }
};

const returnStudentPage = () => {
    router.replace({ name: "Student" });
};

const acessCertificatePage = async () => {
    if (courseCompleted.value) {
        try {
            isLoading.value = true;
            const enrollmentId = Number(route.params.enrollmentId);
            const pdfBlob = await certificateService.getCertificateService(enrollmentId);

            if (pdfBlob) {
                const pdfUrl = URL.createObjectURL(pdfBlob);
                const downloadLink = document.createElement("a");
                downloadLink.href = pdfUrl;
                downloadLink.download = "certificado.pdf";
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);

                setTimeout(() => {
                    URL.revokeObjectURL(pdfUrl);
                }, 1000);
            }
        } catch (error) {
            console.error("Error accessing certificate:", error);
            alert("Ocorreu um erro ao gerar o certificado. Por favor, tente novamente.");
        } finally {
            isLoading.value = false;
        }
    } else {
        alert("Você ainda não concluiu o curso. Finalize-o para gerar o certificado!");
    }
};
</script>

<style scoped>
.completion-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 0;
}

.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 12px;
    height: 600px;
    width: 700px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.title {
    margin-top: 32px;

    font-size: 2rem;
    text-align: center;
    overflow-wrap: break-word;
    word-break: break-word;
    white-space: normal;
}

.subtitle {
    margin-top: 12px;
    text-align: center;
    overflow-wrap: break-word;
    word-break: break-word;
    white-space: normal;
    font-size: 17px;
}

.return-button {
    padding: 8px;
    margin-top: 20px;
    background-color: #482e8f;
    color: #ffffff;
}

.return-button:hover {
    background-color: #331d6e;
}

.card-module {
    width: 200px;
    height: 150px;
    display: block;
    flex-direction: column;
    gap: 0;
    border: 2px solid transparent;
    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
    align-items: center;
    text-align: center;
    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
    cursor: pointer;
    background-color: #461cdc;
    color: #ffffff;
}

.card-module:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
    border-color: #6ff24b;
}

.card-module .mdi {
    font-size: 24px;
}

.card-module-title {
    display: flex;
    align-items: center;
    overflow-wrap: break-word;
    word-break: break-word;
    white-space: normal;
    text-transform: uppercase;
}

.card-module-subtitle {
    overflow-wrap: break-word;
    word-break: break-word;
    white-space: normal;
}

.card-modules-wrapper {
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: center;
    align-items: center;
    margin: 50px;
}

@media (max-width: 768px) {
    .completion-container {
        padding: 1rem;
        min-height: 100vh;
    }

    .card {
        width: 100%;
        max-width: none;
        padding: 1.5rem;
        margin: 0;
        min-height: auto;
        height: auto;
    }

    .title {
        font-size: 1.5rem;
        margin-top: 0;
    }

    .subtitle {
        font-size: 1rem;
    }

    .card-modules-wrapper {
        flex-direction: column;
        gap: 1rem;
        margin: 1.5rem 0;
    }

    .card-module {
        width: 100%;
        max-width: 300px;
        height: 120px;
    }
}

@media (max-width: 480px) {
    .completion-container {
        padding: 0.5rem;
    }

    .card {
        padding: 1rem;
        border-radius: 8px;
    }

    .title {
        font-size: 1.3rem;
    }

    .subtitle {
        font-size: 0.9rem;
        margin-bottom: 1.5rem;
    }

    .card-modules-wrapper {
        gap: 0.8rem;
        margin: 1rem 0;
    }

    .card-module {
        width: 100%;
        max-width: none;
        height: 100px;
        padding: 0.8rem;
    }

    .card-module .mdi {
        font-size: 1.5rem;
    }

    .card-module-title {
        font-size: 0.9rem;
    }

    .card-module-subtitle {
        font-size: 0.8rem;
    }

    .return-button {
        padding: 0.8rem 1.5rem;
        font-size: 0.9rem;
        width: 100%;
        max-width: 300px;
    }
}

@media (max-width: 320px) {
    .completion-container {
        padding: 0.25rem;
    }

    .card {
        padding: 0.8rem;
    }

    .title {
        font-size: 1.1rem;
    }

    .subtitle {
        font-size: 0.85rem;
    }

    .card-module {
        height: 90px;
        padding: 0.6rem;
    }

    .card-module .mdi {
        font-size: 1.2rem;
    }

    .card-module-title {
        font-size: 0.8rem;
    }

    .card-module-subtitle {
        font-size: 0.75rem;
    }
}
</style>

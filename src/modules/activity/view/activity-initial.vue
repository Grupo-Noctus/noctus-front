<template>
    <div class="container" color="secondary">
        <v-card class="card" color="secondary">
            <v-card-title class="title"> Avaliação </v-card-title>

            <div class="description">
                <v-card-subtitle class="subtitle">
                    {{ programmingEvaluation.module.title }}
                </v-card-subtitle>
                <v-card-subtitle class="subtitle">
                    {{ programmingEvaluation.module.description }}
                </v-card-subtitle>
            </div>

            <div class="info">
                <span class="icon-check mdi mdi-check-bold"></span>
                <p>{{ programmingEvaluation.exam.questions.length }} Questões</p>
            </div>

            <v-btn class="btn-start" size="large" color="primary" @click="accessActivity">
                Iniciar a atividade
            </v-btn>
            <v-btn class="btn-courses" color="secondary" @click="accessCourses">
                Voltar aos cursos
            </v-btn>
            <div>
                aqui está os dados do exercício: <span class="text-primary">{{ exams }}</span>
            </div>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { programmingEvaluation } from "../data/activity-form-data";
import { useCourseSecondStore } from "@/modules/course/course-second.store";
import { computed, onMounted, ref } from "vue";
import type { exam } from "@/modules/course/course.types";

const courseSecondStore = useCourseSecondStore();
const route = useRoute();
const router = useRouter();

const moduleId = computed(() => route.params.moduleId);
const exams = ref<exam[]>([]);
const loading = ref(false);

const accessActivity = () => {
    router.replace({ name: "ActivityForm" });
};

const accessCourses = () => {
    router.push({ name: "Student" });
};

onMounted(async () => {
    loading.value = true;
    const response = await courseSecondStore.fetchExams(+moduleId.value);
    console.log(response);
    exams.value = response;
    loading.value = false;
});
</script>

<style scoped>
/* Container principal */
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    margin: 0;
    padding: 0;
}

/* Card */
.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 12px;
    height: 600px;
    width: 700px;
    padding: 30px;
    margin: 20px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

/* Título */
.title {
    margin-top: 32px;
    font-size: 28px;
    text-align: center;
}

/* Descrição */
.description {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 16px;
}

.subtitle {
    word-wrap: break-word;
    font-size: 18px;
    margin-bottom: 8px;
    text-align: center;
}

/* Informações */
.info {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #010326;
}

.icon-check {
    font-size: 40px;
    color: #6ff24b;
}

/* Botões */
.btn-start {
    padding: 8px;
    margin-top: 20px;
}

.btn-start:hover {
    background-color: #6ff24b !important;
}

.btn-courses {
    padding: 8px;
    margin-top: 20px;
    color: #010326;
    background-color: transparent;
    box-shadow: none !important;
    border: none !important;
    transition: background-color 0.3s ease;
}

@media (max-width: 768px) {
    .card {
        width: 100%;
        height: 90%;
        padding: 20px;
        margin: 0;
        border: none !important;
        gap: 4px;
    }

    .title {
        font-size: 24px;
        margin-top: 10px;
    }

    .subtitle {
        font-size: 16px;
        white-space: pre-line;
        overflow-wrap: break-word;
        word-break: break-word;
    }

    .description {
        padding: 0;
        white-space: pre-line;
        overflow-wrap: break-word;
        word-break: break-word;
    }

    .info {
        flex-direction: row;
        gap: 10px;
        justify-content: center;
    }

    .btn-start,
    .btn-courses {
        width: 100%;
        margin-top: 1px;
    }
}

@media (max-width: 480px) {
    .title {
        font-size: 20px;
    }

    .subtitle {
        font-size: 14px;
    }

    .icon-check {
        font-size: 28px;
    }

    .description {
        padding: 0;
        white-space: pre-line;
    }
}
</style>

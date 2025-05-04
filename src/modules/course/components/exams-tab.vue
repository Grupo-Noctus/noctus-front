<template>
    <div
        v-if="loadingExamCourse"
        min-height="40"
        class="font-weight-medium d-flex justify-space-between align-center"
        style="height: 50px; width: 100%"
    >
        <v-skeleton-loader type="heading" style="width: 15%"></v-skeleton-loader>
        <v-skeleton-loader type="heading" style="width: 60%"></v-skeleton-loader>
        <v-skeleton-loader type="heading" style="width: 30%"></v-skeleton-loader>
    </div>
    <div v-else-if="!eachExamTabCourse.length" class="text-center text-weight-bold pa-1 py-3">
        Erro ao buscar tarefas do curso
    </div>
    <v-card
        v-for="examTabCourse in eachExamTabCourse"
        v-else
        :key="examTabCourse.id"
        class="rounded-0"
        @click="enterExam(1)"
    >
        <v-divider v-if="examTabCourse.id > 1"></v-divider>
        <div class="content-course justify-space-between align-center">
            <div>
                <v-btn
                    icon="mdi mdi-format-list-checks"
                    density="comfortable"
                    size="x-medium"
                    variant="tonal"
                    :color="iconContentColor"
                    class="px-2 py-2 rounded-0"
                >
                </v-btn>
            </div>
            <div class="ml-4 mt-1">
                <div class="text-capitalize">Avaliação: {{ examTabCourse.name }}</div>
            </div>
            <div>
                <v-chip
                    variant="tonal"
                    color="primary"
                    style="width: fit-content"
                    size="small"
                    density="compact"
                >
                    <template #append>
                        <div>{{ examTabCourse.questionCount }}</div>
                    </template>
                    Questões:
                </v-chip>
            </div>
        </div>
    </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useCourseStore } from "../course.store";
import { useIndexStore } from "@/stores/index.store";

const indexStore = useIndexStore();
const courseStore = useCourseStore();

const loadingExamCourse = ref(true);
const eachExamTabCourse = ref();

const iconContentColor = computed(() => (indexStore.isDark ? "#FFFFFF" : "#461CDC"));

onMounted(async () => {
    // colocar um promisse all
    eachExamTabCourse.value = await courseStore.getContentExam();
    loadingExamCourse.value = false;
});

const enterExam = (idCourse: number) => {
    return console.log("entrar no exame");
};
</script>

<style scoped>
.content-course {
    display: flex;
    padding: 8px;
    align-items: center;
    box-shadow: none;
    cursor: pointer;
}

:deep(.v-expansion-panel-title.v-expansion-panel-title--static) {
    padding: 10px;
}

:deep(.v-expansion-panel-text__wrapper) {
    padding: 0px;
}
</style>

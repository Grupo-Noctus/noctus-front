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
        :disabled="disabledBtnExam"
        @click="enterExam"
    >
        <v-divider v-if="examTabCourse.id > 1"></v-divider>
        <div class="content-course justify-space-between align-center">
            <div class="ml-4 mt-1">
                <div class="text-capitalize">Avaliação: {{ examTabCourse.title }}</div>
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
                        <div>Questões: {{ examTabCourse.questions.length }}</div>
                    </template>
                </v-chip>
            </div>
        </div>
    </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useCourseSecondStore } from "../course-second.store";
import router from "@/plugins/router/router";
import { userEvaluationStore } from "@/modules/activity/activity.store";
import { useRoute } from "vue-router";

const route = useRoute();
const courseSecondStore = useCourseSecondStore();
const evaluationStore = userEvaluationStore();
const correctAnswers = evaluationStore.correctAnswers;
const courseId = computed(() => route.params.id);


const props = defineProps({
    clickAndEnterMode: {
        type: Boolean,
        required: true,
        default: false,
    },
});

const loadingExamCourse = computed(() => courseSecondStore.isLoadingExams);
const eachExamTabCourse = computed(() => courseSecondStore.exams);
const fistModule = computed(() => courseSecondStore.modules[0].id);

onMounted(async () => {
    await courseSecondStore.fetchExams();
});

const enterExam = () => {
    const idModule = fistModule.value;
    const idCourse = route.params.id;
    router.push({
        name: "ActivityInitial",
        params: { courseId: String(idCourse), moduleId: String(idModule) },
    });
    if (props.clickAndEnterMode) {
        return;
    } else {
        return;
    }
};



const disabledBtnExam = computed(() => {return evaluationStore.getCourseExam(+courseId.value)});
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

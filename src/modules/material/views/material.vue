<template>
    <div class="pa-0 ma-4">
        <div class="text-h6 text-center" variant="text">Arquivos do curso</div>

        <div v-if="loading" class="loading-container text-center">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>

        <div v-else-if="!courseFiles.length" class="error-container text-center">
            <v-icon color="red" size="50">mdi-alert-circle</v-icon>
            <p class="text-h6 mt-2">
                Desculpe, não há arquivos disponíveis para este curso no momento.
            </p>
        </div>

        <v-row v-else class="mt-4" no-gutters>
            <v-col v-for="(file, index) in courseFiles" :key="index" cols="12" md="4" class="my-2">
                <v-card
                    color="primary"
                    class="mx-auto"
                    max-width="300"
                    height="300"
                    :href="getMaterialUrl(file.filename)"
                >
                    <v-sheet
                        color="primary"
                        height="200px"
                        width="100%"
                        class="d-flex justify-center align-center"
                    >
                        <v-icon color="white" size="200">mdi-folder</v-icon>
                    </v-sheet>
                    <div
                        class="d-flex flex-column justify-center align-center pa-4"
                        style="color: white"
                    >
                        <v-card-title>{{ file.name }}</v-card-title>
                        <v-card-subtitle>{{ file.type }}</v-card-subtitle>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { MaterialService } from "../material.service";
import { getMaterialUrl } from "@/utils/image-url";

const materialService = MaterialService();
const route = useRoute();

const courseFiles = ref<any[]>([]);
const loading = ref(false);

onMounted(() => {
    fetchCourseFiles();
});

const fetchCourseFiles = async () => {
    loading.value = true;
    const courseId = route.params.id;
    courseFiles.value = await materialService.getMaterialsByCourseIdService(+courseId);
    loading.value = false;
};
</script>

<style scoped>
.loading-container {
    margin-top: 2rem;
}

.loading-container p {
    margin-top: 1rem;
    font-size: 1.1rem;
}

.error-container {
    margin-top: 2rem;
    padding: 2rem;
    background-color: #ffebee;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.error-container p {
    color: #d32f2f;
}
</style>

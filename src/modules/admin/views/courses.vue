<template>
    <v-card class="d-flex justify-space-between align-end px-2 pt-2" variant="text">
        <div class="d-flex pa-0">
            <h1 class="text-h4">Cursos</h1>
        </div>
        <div class="pa-0">
            <create-course-dialog @confirm-create="handleCreateCourse"></create-course-dialog>
        </div>
    </v-card>

    <v-divider class="mb-5 mt-3"></v-divider>

    <v-row justify="center">
        <v-col v-if="loading" class="text-center">
            <v-progress-circular
                :indeterminate="loading"
                :size="37"
                color="primary"
            ></v-progress-circular>
        </v-col>
        <v-col v-else-if="!courses || courses.length === 0" cols="12" class="text-center">
            <v-alert type="info">Nenhum curso encontrado</v-alert>
        </v-col>

        <v-col
            v-for="course in courses"
            v-else
            :key="course.id"
            cols="auto"
            sm="6"
            md="4"
            lg="4"
            class="pa-4"
        >
            <v-card
                class="course-card pa-4 mx-auto"
                elevation="4"
                :class="{ 'dark-theme': isDark }"
            >
                <v-img
                    v-if="!course.image"
                    src="https://fakeimg.pl/600x400?text=sem+imagem&font=bebas"
                    height="200"
                    cover
                    class="course-image"
                >
                </v-img>

                <v-img v-else :src="course.image" height="200" cover class="course-image"> </v-img>

                <v-card-title class="text-h5 mt-2">
                    {{ course.name }}
                </v-card-title>

                <v-card-text class="text-body-1 overflow-auto mb-0">
                    {{ course.description }}
                </v-card-text>

                <v-card-actions>
                    <v-btn
                        color="warning"
                        variant="tonal"
                        size="large"
                        block
                        :disabled="!course"
                        @click="viewCourse(course.id)"
                    >
                        Acessar Módulos
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useIndexStore } from "@/stores/index.store";
import { useRouter } from "vue-router";
import { AdminService } from "../admin.service";
import type { TCourses } from "../admin.types";
import createCourseDialog from "@/modules/admin/views/create-course-dialog.vue";

const allCourses = [
    {
        courseId: 201,
        active: true,
        completed: false,
        courseName: "Lógica de Programação",
        courseDescription:
            "Entenda os princípios básicos de lógica computacional e resolução de problemas.",
        courseImage: "https://pbs.twimg.com/media/GDEEo-fWcAAjQzw.jpg",
    },
    {
        courseId: 202,
        active: true,
        completed: false,
        courseName: "Frontend com React",
        courseDescription: "Desenvolva interfaces interativas com React, Hooks e componentização.",
        courseImage: "https://example.com/images/react.jpg",
    },
    {
        courseId: 203,
        active: false,
        completed: true,
        courseName: "Estrutura de Dados",
        courseDescription:
            "Aprenda a trabalhar com listas, pilhas, filas e árvores de forma eficiente.",
        courseImage: "https://example.com/images/estruturas.jpg",
    },
    {
        courseId: 204,
        active: false,
        completed: true,
        courseName: "Engenharia de Software",
        courseDescription:
            "Explore metodologias ágeis, documentação técnica e modelagem de sistemas.",
        courseImage: "https://example.com/images/engenharia.jpg",
    },
    {
        courseId: 205,
        active: true,
        completed: false,
        courseName: "DevOps com Docker",
        courseDescription:
            "Automatize o deploy e desenvolvimento de aplicações com Docker e CI/CD.",
        courseImage: "https://example.com/images/devops.jpg",
    },
];

const router = useRouter();
const indexStore = useIndexStore();
const adminService = AdminService();

const courses = ref<TCourses[]>([]);
const loading = ref(false);

const handleCreateCourse = async (form) => {
    // await api.post("/courses", form);
};

const fetchCourses = async () => {
    try {
        loading.value = true;
        const response = await adminService.getCoursesService();
        courses.value = response;
        loading.value = false;
    } catch (error) {
        console.error("Erro ao carregar cursos:", error);
    }
};

onMounted(() => {
    fetchCourses();
});

const isDark = computed(() => indexStore.isDark);

const viewCourse = (courseId: number) => {
    router.push({ name: "CourseDetail", params: { id: String(courseId) } });
};
</script>

<style scoped>
.course-card {
    max-width: 400px;
    display: flex;
    flex-direction: column;
    border-radius: 12px;
}

.course-image {
    position: relative;
    border-radius: 8px;
}

.v-card-title {
    word-break: break-word;
    line-height: 1.4;
}

.v-card-text {
    flex-grow: 1;
    height: 120px;
}

.container-subtitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.dark-theme {
    background-color: #2e323f;
    color: #fff;
}

.mx-auto {
    margin-left: auto;
    margin-right: auto;
}
</style>

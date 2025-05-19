<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" class="pa-2">
                <h1 class="text-h4 mb-0 text-center">Meus Cursos</h1>
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-col v-if="loading" class="text-center">
                <v-progress-circular
                    :indeterminate="loading"
                    :size="37"
                    color="primary"
                ></v-progress-circular>
            </v-col>
            <v-col v-else-if="!courses || courses.length === 0" cols="12" class="text-center">
                <v-alert type="info">Nenhum curso encontrado em sua matricula.</v-alert>
            </v-col>

            <v-col
                v-for="course in courses"
                v-else
                :key="course.enrollmentId"
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
                        v-if="!course.courseImage"
                        src="https://fakeimg.pl/600x400?text=sem+imagem&font=bebas"
                        height="200"
                        cover
                        class="course-image"
                    >
                    </v-img>

                    <v-img v-else :src="course.courseImage" height="200" cover class="course-image">
                        <v-chip
                            v-if="isExpired(course.enrollmentEndDate)"
                            color="red"
                            class="ma-3 text-uppercase"
                            size="large"
                            label
                            style="font-weight: bold"
                        >
                            expirado
                        </v-chip>
                    </v-img>

                    <v-card-title class="text-h5 mt-2">
                        {{ course.courseName }}
                    </v-card-title>

                    <div class="container-subtitle">
                        <v-card-subtitle class="mb-3 text-body-2">
                            Expira em: {{ formatDate(course.enrollmentEndDate) }}
                        </v-card-subtitle>

                        <div class="mb-3 pe-4 text-body-2">
                            <v-chip
                                v-if="isExpired(course.enrollmentEndDate)"
                                color="red"
                                class="text-body-2 text-uppercase"
                                size="small"
                                label
                                style="font-weight: bold"
                            >
                                expirado
                            </v-chip>
                        </div>
                    </div>

                    <v-card-text class="text-body-1 overflow-auto mb-0">
                        {{ course.courseDescription }}
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                            color="warning"
                            variant="tonal"
                            size="large"
                            block
                            :disabled="!course.active"
                            @click="viewCourse(course.courseId)"
                        >
                            Acessar Curso
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useIndexStore } from "@/stores/index.store";
import { useRouter } from "vue-router";
import { CourseService } from "@/modules/course/course.service";

interface CourseByEnrollment {
    enrollmentId: number;
    active: boolean;
    completed: boolean;
    enrollmentStartDate: Date;
    enrollmentEndDate: Date;
    courseId: number;
    courseName: 1;
    courseDescription: string;
    courseImage: string;
}

const { getCourseByEnrollmentService } = CourseService();

const router = useRouter();
const indexStore = useIndexStore();

const courses = ref<CourseByEnrollment[]>([]);
const loading = ref(false);

const fetchCourses = async () => {
    try {
        loading.value = true;
        const response = await getCourseByEnrollmentService();
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

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
};

const isExpired = (dateString: string): boolean => {
    return new Date(dateString) < new Date();
};

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

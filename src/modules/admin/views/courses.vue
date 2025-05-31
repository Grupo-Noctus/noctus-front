<template>
    <v-card class="pa-3 d-flex justify-space-between align-center" variant="text">
        <div class="d-flex pa-0">
            <h1 class="text-h5">Cursos</h1>
        </div>
        <div class="pa-0">
            <v-btn
                variant="elevated"
                size="small"
                density="default"
                prepend-icon="mdi-plus"
                color="primary"
                @click="handleWishToCreateCourse"
            >
                criar curso
            </v-btn>
            <create-course-dialog
                v-model="isCreateDialogOpen"
                :is-external-control="true"
                :edit-data="selectedCourse"
                @confirm-create="handleFormSubmit"
                @cancel="handleDialogCancel"
            ></create-course-dialog>
        </div>
    </v-card>

    <v-divider class="mb-4"></v-divider>

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
                class="course-card px-4 py-2 mx-auto"
                elevation="4"
                :class="{ 'dark-theme': isDark }"
            >
                <delete-and-edit-menu
                    :item="course"
                    @delete="handleWishToDeleteCourse"
                    @edit="handleWishToEditCourse"
                />
                <v-img
                    :src="getImageUrl(course.image)"
                    height="200"
                    cover
                    class="course-image mt-3"
                >
                </v-img>

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

        <confirmation-dialog
            :model-value="isDeleteDialogOpen"
            :title="`remover curso`"
            :item-to-delete="selectedCourse?.name"
            @confirm="handleConfirmDialog"
            @cancel="handleCancelDialog"
        ></confirmation-dialog>
    </v-row>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

import { AdminService } from "../admin.service";
import { getImageUrl } from "@/utils/image-url";
import type { TCourses, TCreateCourseData } from "../admin.types";
import { useIndexStore } from "@/stores/index.store";

import deleteAndEditMenu from "@/components/menus/delete-and-edit-menu.vue";
import confirmationDialog from "@/components/dialogs/confirmation-dialog.vue";
import createCourseDialog from "@/modules/admin/components/create-course-dialog.vue";

const router = useRouter();
const indexStore = useIndexStore();
const adminService = AdminService();

const isCreateDialogOpen = ref(false);
const selectedCourse = ref<TCourses | null>(null);
const isDeleteDialogOpen = ref<boolean>(false);
const courses = ref<TCourses[]>([]);
const loading = ref(false);

const isDark = computed(() => indexStore.isDark);

const handleCreateCourse = async (form: TCreateCourseData) => {
    const response = await adminService.createCourseService(form);

    if (response) {
        fetchCourses();
    }
};

const handleFormSubmit = (form: TCreateCourseData & { id?: number }) => {
    if (form.id) {
        handleEditCourse(form);
    } else {
        handleCreateCourse(form);
    }
};

const handleEditCourse = async (form: TCreateCourseData & { id?: number }) => {
    console.info("edit", form);
    const response = await adminService.updateCourseService(form);

    if (response) {
        fetchCourses();
    }
};

const handleWishToEditCourse = (course: TCourses) => {
    selectedCourse.value = course;
    isCreateDialogOpen.value = true;
};

const handleWishToCreateCourse = () => {
    selectedCourse.value = null;
    isCreateDialogOpen.value = true;
};

const handleDeleteCourse = async () => {
    isDeleteDialogOpen.value = false;
    if (!selectedCourse.value?.id) {
        return;
    }

    const response = await adminService.deleteCourseService(selectedCourse.value?.id);

    if (response) {
        fetchCourses();
    }
};

const handleConfirmDialog = () => {
    isDeleteDialogOpen.value = false;
    handleDeleteCourse();
};

const handleCancelDialog = () => {
    isDeleteDialogOpen.value = false;
    selectedCourse.value = null;
};

const handleWishToDeleteCourse = (course: TCourses) => {
    selectedCourse.value = course;
    isDeleteDialogOpen.value = true;
};

const handleDialogCancel = () => {
    selectedCourse.value = null;
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

const viewCourse = (courseId: number) => {
    router.push({ name: "Modules", params: { id: String(courseId) } });
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

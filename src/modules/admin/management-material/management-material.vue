<template>
  <v-card class="pa-3 d-flex justify-space-between align-center" variant="text">
    <div class="d-flex pa-0">
      <h1 class="text-h5">Materiais</h1>
    </div>
  </v-card>

  <v-divider class="mb-4"></v-divider>

  <v-row justify="center">
    <v-col v-if="loading" class="text-center">
      <v-progress-circular :indeterminate="loading" :size="37" color="primary"></v-progress-circular>
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
      <v-card class="course-card px-4 py-2 mx-auto" elevation="4" :class="{ 'dark-theme': isDark }">
        <delete-and-edit-menu :item="course" @delete="handleWishToDeleteCourse" @edit="handleWishToEditCourse" />

        <v-img :src="getImageUrl(course.image)" height="200" cover class="course-image mt-3" />

        <v-card-title class="text-h5 mt-2">
          {{ course.name }}
        </v-card-title>

        <v-card-text class="text-body-1 overflow-auto mb-0">
          {{ course.description }}
        </v-card-text>

        <v-card-actions>
          <v-btn color="warning" variant="tonal" size="large" block :disabled="!course" @click="viewMaterials(course.id)">
            Acessar Materiais
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>

    <confirmation-dialog
      :model-value="isDeleteDialogOpen"
      :title="`Remover curso`"
      :item-to-delete="selectedMaterial?.name"
      @confirm="handleConfirmDialog"
      @cancel="handleCancelDialog"
    />
  </v-row>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

import { AdminService } from "../admin.service";
import { getImageUrl } from "@/utils/image-url";
import type { TCourses, TMaterial } from "../admin.types";
import { useIndexStore } from "@/stores/index.store";

import deleteAndEditMenu from "@/components/menus/delete-and-edit-menu.vue";
import confirmationDialog from "@/components/dialogs/confirmation-dialog.vue";

const router = useRouter();
const indexStore = useIndexStore();
const adminService = AdminService();


const isDeleteDialogOpen = ref<boolean>(false);
const selectedMaterial = ref<TMaterial | null>(null);
const courses = ref<TCourses[]>([]);
const loading = ref(false);

const isDark = computed(() => indexStore.isDark);

const handleWishToEditCourse = (course: TCourses) => {
  selectedMaterial.value = course;
};

const handleDeleteCourse = async () => {
  isDeleteDialogOpen.value = false;
  if (!selectedMaterial.value?.id) return;

  const response = await adminService.deleteCourseService(selectedMaterial.value.id);
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
  selectedMaterial.value = null;
};

const handleWishToDeleteCourse = (selectedMaterial: TMaterial) => {
  selectedMaterial.value = course;
  isDeleteDialogOpen.value = true;
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

const viewMaterials = (courseId: number) => {
  if (!courseId) return;
  router.push({ name: "ManagementMaterial", params: { id: String(courseId) } });
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

<template>
    <div>
        <v-card class="pa-3 d-flex justify-space-between align-center" variant="text">
            <div class="d-flex pa-0">
                <h1 class="text-h5">Materiais</h1>
            </div>
            <div class="pa-0">
                <v-btn variant="elevated" size="small" density="default" prepend-icon="mdi-plus" color="primary"
                    @click="handleWishToCreateMaterial">
                    criar material
                </v-btn>
                <create-material-dialog v-model="isCreateDialogOpen" :is-external-control="true"
                    :edit-data="selectedMaterial" @confirm-create="handleFormSubmit" @cancel="handleDialogCancel">
                </create-material-dialog>
            </div>
        </v-card>
        <v-divider class="mb-4"></v-divider>

        <v-row justify="center">
            <v-col v-if="loading" class="text-center">
                <v-progress-circular :indeterminate="loading" :size="37" color="primary"></v-progress-circular>
            </v-col>
            <v-col v-else-if="!materials || materials.length === 0" cols="12" class="text-center">
                <v-alert type="info" class="w-75 custom-alert">Nenhum material encontrado</v-alert>
            </v-col>

            <v-col v-for="material in materials" v-else :key="material.id" cols="auto" sm="6" md="4" lg="4"
                class="pa-4">
                <v-card class="course-card px-4 py-2 mx-auto" elevation="4" :class="{ 'dark-theme': isDark }">
                    <delete-and-edit-menu :item="material" :disable-edit="true" @delete="handleWishToDeleteMaterial" />
                    <v-card-title class="text-h5 mt-2">
                        {{ material.name }}
                    </v-card-title>

                    <v-card-text class="text-body-1 overflow-auto mb-0">
                        {{ material.description }}
                    </v-card-text>
                </v-card>
            </v-col>

            <confirmation-dialog :model-value="isDeleteDialogOpen" :title="`Remover material`"
                :item-to-delete="selectedMaterial?.name" @confirm="handleConfirmDialog"
                @cancel="handleCancelDialog"></confirmation-dialog>

        </v-row>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

import { AdminService } from "../admin.service";
import type { TCreateMaterial, TMaterial } from "../admin.types";
import { useIndexStore } from "@/stores/index.store";

import deleteAndEditMenu from "@/components/menus/delete-and-edit-menu.vue";
import confirmationDialog from "@/components/dialogs/confirmation-dialog.vue";
import createMaterialDialog from "./dialogs/create-material-dialog.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const courseId = computed(() => Number(route.params.id));

const indexStore = useIndexStore();
const adminService = AdminService();

const isCreateDialogOpen = ref(false);
const selectedMaterial = ref<TMaterial | null>(null);
const isDeleteDialogOpen = ref<boolean>(false);
const materials = ref<TMaterial[]>([]);
const loading = ref(false);


const isDark = computed(() => indexStore.isDark);

const handleCreateMaterial = async (form: TCreateMaterial) => {
    const response = await adminService.createMaterialService(form);

    if (response) {
        fetchMaterials();
    }
};

const handleFormSubmit = (form: TCreateMaterial & { id?: number }) => {
    handleCreateMaterial(form);
};

const handleWishToCreateMaterial = () => {
    selectedMaterial.value = null;
    isCreateDialogOpen.value = true;
};

const handleDeleteCourse = async () => {
    isDeleteDialogOpen.value = false;
    if (!selectedMaterial.value?.id) {
        return;
    }

    const response = await adminService.deleteMaterialService(selectedMaterial.value?.id);
    if (response) {
        fetchMaterials();
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

const handleWishToDeleteMaterial = (material: TMaterial) => {
    selectedMaterial.value = material;
    isDeleteDialogOpen.value = true;
};

const handleDialogCancel = () => {
    selectedMaterial.value = null;
};

const fetchMaterials = async () => {
    try {
        loading.value = true;
        const response = await adminService.getMaterialsService(courseId.value);
        materials.value = response;
        loading.value = false;
    } catch (error) {
        console.error("Erro ao carregar cursos:", error);
    }
};

onMounted(() => {
    fetchMaterials();
});


</script>

<style scoped>

.custom-alert {
  width: 100%;
  margin: 16px auto;
}

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

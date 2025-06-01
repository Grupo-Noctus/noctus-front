<template>
    <v-card class="pa-3 d-flex justify-space-between align-center" elevation="0">
        <div class="text-h6 text-center" variant="text">Módulos</div>
        <div>
            <v-btn
                prepend-icon="mdi-plus"
                density="default"
                size="small"
                color="primary"
                elevation="0"
                @click="handleWishToCreateModule"
                >criar módulo</v-btn
            >
            <create-and-edit-module
                v-model="isCreateDialogOpen"
                :is-external-control="true"
                :edit-data="selectedModule"
                @confirm-create="handleFormSubmit"
                @cancel="handleDialogCancel"
            />
        </div>
    </v-card>
    <v-divider class="mb-4"></v-divider>
    <v-card
        class="d-flex justify-center border-sm"
        elevation="0"
        style="width: 80%; margin: 0 auto"
    >
        <content :modules="modules" @update:modules="fetchModules" />
    </v-card>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

import { computed, onMounted, ref } from "vue";

import { AdminService } from "../../admin.service";
import type { TContentModule } from "@/modules/course/course.types";
import Content from "../../components/content.vue";
import CreateAndEditModule from "../../components/create-and-edit-module.vue";
import type { TCreateModuleData } from "../../admin.types";
const route = useRoute();
const adminService = AdminService();

const modules = ref<TContentModule[]>([]);

const isCreateDialogOpen = ref(false);
const selectedModule = ref<TContentModule | null>(null);

const courseId = computed(() => route.params.id);

const handleFormSubmit = async (module: TCreateModuleData) => {
    const response = await adminService.createModuleService(module, Number(courseId.value));

    if (response) {
        fetchModules();
    }
};

const handleDialogCancel = () => {
    selectedModule.value = null;
    isCreateDialogOpen.value = false;
};

const handleWishToCreateModule = () => {
    selectedModule.value = null;
    isCreateDialogOpen.value = true;
};

onMounted(() => {
    fetchModules();
});

const fetchModules = async () => {
    const response = await adminService.getCoursesService();
    const findCourse = response.find((course) => course.id === Number(courseId.value));
    if (findCourse) {
        modules.value = findCourse.modules;
    }
};
</script>

<style scoped></style>

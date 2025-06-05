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
    <v-row class="h-100">
        <v-col cols="12" md="8">
            <v-card
                class="d-flex justify-center border-sm"
                elevation="0"
                style="width: 80%; margin: 0 auto"
            >
                <content :modules="modules" @update:modules="fetchModules" />
            </v-card>
        </v-col>
        <v-col cols="12" md="4">
            <div class="h-100">
                <course-chat :non-fixed="true" :course-id="courseId"></course-chat>
            </div>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

import { computed, onMounted, ref } from "vue";

import { AdminService } from "../../admin.service";
import type { TContentModule } from "@/modules/course/course.types";
import Content from "../../components/content.vue";
import CreateAndEditModule from "../../components/create-and-edit-module.vue";
import type { TCreateModuleData } from "../../admin.types";
import { useAdminStore } from "@/modules/admin/admin.store";
import CourseChat from "@/components/chat/course-chat.vue";

const route = useRoute();
const adminStore = useAdminStore();
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
    adminStore.loadingModulesAndContents = true;
    const response = await adminService.getCoursesService();
    const findCourse = response.find((course) => course.id === Number(courseId.value));
    if (findCourse) {
        modules.value = findCourse.modules;
    }
    adminStore.loadingModulesAndContents = false;
};
</script>

<style scoped></style>

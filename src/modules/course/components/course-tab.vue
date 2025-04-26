<template>
    <!--<v-skeleton-loader v-if="loading" type="image" width="500"></v-skeleton-loader>-->

    <v-card class="ma-4 border-sm rounded-lg" elevation="0" style="max-width: 500px">
        <v-tabs v-model="selectedTab" bg-color="primary" grow :slider-color="sliderColor">
            <v-tab
                v-for="courseTab in listCourseTab.title"
                :key="courseTab.name"
                v-model="courseTab.model"
                :class="courseTab.style"
                :text="courseTab.name"
            ></v-tab>
        </v-tabs>

        <v-card-text class="pa-0">
            <v-tabs-window v-model="selectedTab">
                <v-tabs-window-item value="modules">
                    <modules-and-content-tab></modules-and-content-tab>
                </v-tabs-window-item>

                <v-tabs-window-item value="exams">
                    <exams-tab></exams-tab>
                </v-tabs-window-item>
            </v-tabs-window>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import { useIndexStore } from "@/stores/index.store";

import ModulesAndContentTab from "./modules-and-content-tab.vue";
import ExamsTab from "./exams-tab.vue";

const indexStore = useIndexStore();

const selectedTab = ref("modules");

const listCourseTab = computed(() => {
    return {
        title: [
            {
                name: "Módulo",
                style: "text-capitalize text-body-2 font-weight-bold",
                model: "module",
            },
            {
                name: "Avaliações",
                style: "text-capitalize text-body-2 font-weight-bold",
                model: "exam",
            },
        ],
    };
});

const sliderColor = computed(() => (indexStore.isDark ? "#6BFF50" : "#6BFF50"));
</script>

<style scoped>
:deep(.v-theme--light .v-expansion-panel-title.v-expansion-panel-title--active) {
    background-color: rgba(70, 28, 220, 0.2);
    color: rgb(70, 28, 220);
    height: 20px;
}

:deep(.v-theme--dark .v-expansion-panel-title.v-expansion-panel-title--active) {
    background-color: rgba(255, 255, 255, 0.055);
    color: white;
}
</style>

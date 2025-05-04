<template>
    <div style="height: 100%; overflow-y: auto" class="overflow-y">
        <v-tabs v-model="selectedTab" grow :slider-color="sliderColor" class="tabs-header">
            <v-tab
                v-for="courseTab in listCourseTab.title"
                :key="courseTab.name"
                :value="courseTab.model"
                :class="courseTab.style"
            >
                {{ courseTab.name }}
            </v-tab>
        </v-tabs>

        <v-card-text class="tab-content pa-0 rounded-0">
            <v-tabs-window v-model="selectedTab">
                <v-tabs-window-item value="module">
                    <modules-and-content-tab />
                </v-tabs-window-item>

                <v-tabs-window-item value="exam">
                    <exams-tab />
                </v-tabs-window-item>
            </v-tabs-window>
        </v-card-text>
    </div>
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
    background-color: rgba(70, 28, 220, 0.2);
    color: rgb(243, 239, 239);
}
/*
.scrollable-content {
    max-height: 87vh;
    overflow-y: auto;
}

.tabs-header {
    min-height: 48px;
    max-height: 48px;
    overflow: hidden;
}

.tab-container {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.tab-content {
    flex: 1;
    overflow-y: auto;
    height: 100%;
} */
</style>

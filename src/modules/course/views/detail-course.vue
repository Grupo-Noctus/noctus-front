<template>
    <v-row no-gutters class="h-100">
        <v-col cols="12" sm="12" lg="9" class="border-e">
            <div class="rounded-0 border-t pa-0" style="height: auto">
                <CoursePlayerVideo />
            </div>
        </v-col>

        <v-col class="h-100" :style="infoAreaBackGround">
            <v-sheet elevation="0" class="rounded-0 border-t" :style="infoAreaStyle">
                <CourseTab />
            </v-sheet>
        </v-col>
    </v-row>
</template>

<script lang="ts" setup>
import { vuetify } from "@/plugins/vuetify";
import { computed } from "vue";
import CoursePlayerVideo from "../components/course-player-video.vue";
import CourseTab from "../components/course-tab.vue";
import { useIndexStore } from "@/stores/index.store";

const indexStore = useIndexStore();

const infoAreaStyle = computed(() => {
    return vuetify.display.mobile.value ? "height: fit-content" : "height: 93vh";
});

const infoAreaBackGround = computed(() =>
    indexStore.isDark ? "background-color: #212121" : "background-color: #ffffff",
);
</script>

<style scoped>
.h-100 {
    height: 100%;
}
</style>

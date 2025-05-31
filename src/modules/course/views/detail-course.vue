<template>
    <v-row no-gutters class="h-100">
        <v-col cols="12" sm="12" lg="9" class="border-e">
            <div class="rounded-0 border-t pa-0" style="height: auto">
                <course-player-video />
            </div>
        </v-col>

        <v-col class="h-100" :style="infoAreaBackGround">
            <v-sheet elevation="0" class="rounded-0 border-t" :style="infoAreaStyle">
                <course-tab :click-and-enter-mode="false" />
            </v-sheet>
        </v-col>

        <div>
            <course-chat-vue></course-chat-vue>
        </div>
    </v-row>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { vuetify } from "@/plugins/vuetify";

import { useIndexStore } from "@/stores/index.store";

import CoursePlayerVideo from "../components/course-player-video.vue";
import CourseTab from "../components/course-tab.vue";
import courseChatVue from "../../../components/chat/course-chat.vue";
import { useRoute } from "vue-router";
import { CourseService } from "../course.service";
import { TContentVideoModule } from "../course.types";

const route = useRoute();
const indexStore = useIndexStore();
const courseService = CourseService();

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

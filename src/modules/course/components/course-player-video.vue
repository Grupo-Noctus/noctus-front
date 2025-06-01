<template>
    <div class="video-container">
        <div class="video-wrapper" @mouseenter="showControls = true" @mouseleave="showControls = false">
            <div v-if="isLoadingContent" class="video-placeholder">
                <div class="loader">Carregando vídeo...</div>
            </div>

            <video v-show="!isLoadingContent" ref="playerRef" playsinline controls class="video-element"></video>

            <div class="video-navigation" :class="{ 'controls-visible': showControls }">
                <v-btn icon variant="text" color="white" class="navigation-btn prev-btn"
                    :disabled="!hasPreviousVideo || isLoadingContent" size="large" @click="playPreviousVideo">
                    <v-icon size="large">mdi-skip-previous</v-icon>
                </v-btn>
                <v-btn icon variant="text" color="white" class="navigation-btn next-btn"
                    :disabled="!hasNextVideo || isLoadingContent" size="large" @click="playNextVideo">
                    <v-icon size="large">mdi-skip-next</v-icon>
                </v-btn>
            </div>
        </div>
    </div>

    <div class="d-flex align-center flex-wrap rounded-0" variant="text">
        <v-row no-gutters class="w-100 mx-3 border-b-sm d-flex flex-wrap justify-space-between">
            <v-col cols="12" sm="12" md="12" lg="auto">
                <div v-if="isLoadingContent" class="d-flex align-center" style="width: 300px; height: 40px">
                    <v-skeleton-loader type="heading" style="width: 100%"></v-skeleton-loader>
                </div>
                <div v-else class="pa-3 font-weight-bold text-body-h6 text-capitalize">
                    {{ currentVideoTitle }}
                </div>
            </v-col>

            <v-col cols="12" sm="12" md="12" lg="auto" class="d-flex align-center justify-end flex-wrap">
                <v-btn append-icon="mdi mdi-book-education-outline " variant="text" class="text-capitalize text"
                    size="small">
                    detalhado
                </v-btn>
                <v-btn append-icon="mdi-book-arrow-down-outline" variant="text" class="text-capitalize" size="small">
                    material
                </v-btn>
            </v-col>
        </v-row>
        <div></div>
    </div>

    <div v-if="isLoadingContent" class="my-4 mx-3" style="width: 50%">
        <v-skeleton-loader type="heading" style="width: 100"></v-skeleton-loader>
    </div>
    <v-card v-else variant="tonal" class="video-description-card">
        <span class="font-weight-bold">Descrição:</span>
        {{ currentVideoDescription }}
    </v-card>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, nextTick, watch } from "vue";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import { useCourseStore } from "../../auth/course.store";

const courseStore = useCourseStore();
const courseVideoUrl = computed(() => courseStore.courseVideoUrl);

const playerRef = ref<HTMLVideoElement | null>(null);
const playerInstance = ref<Plyr | null>(null);
const showControls = ref(false);

const isLoadingContent = computed(() => courseStore.isLoadingContent);
const selectedContent = computed(() => courseStore.selectedContent);
const skipContent = computed(() => courseStore.skipContent);

const currentVideoTitle = computed(
    () => selectedContent.value.content.name || "título indisponível",
);
const currentVideoDescription = computed(
    () => selectedContent.value.content.description || "indisponível no momento",
);
const hasPreviousVideo = computed(() => skipContent.value.prevContentOrder);
const hasNextVideo = computed(() => skipContent.value.nextContentOrder);

const loadVideoByIndex = async (mode: "next" | "prev") => {
    if (!mode) return;
    await courseStore.getCourseVideoUrl(mode);
};

const playPreviousVideo = () => {
    if (!hasPreviousVideo.value) return;

    loadVideoByIndex("prev");
};

const playNextVideo = () => {
    if (!hasNextVideo.value) return;
    loadVideoByIndex("next");
};

onMounted(async () => {
    await nextTick();
    courseStore.setSelectedContent();
    await courseStore.getCourseVideoUrl();
});

watch(courseVideoUrl, async (newUrl) => {
    if (newUrl && playerRef.value) {
        if (!playerInstance.value) {
            playerInstance.value = new Plyr(playerRef.value, {
                ratio: "16:9",
                fullscreen: {
                    enabled: true,
                    fallback: true,
                    iosNative: true,
                },
            });
        }

        playerInstance.value.source = {
            type: "video",
            sources: [
                {
                    src: newUrl,
                    type: "video/mp4",
                },
            ],
        };

        playerInstance.value.once("ready", () => {
            courseStore.setIsLoadingContent(false);
        });
    }
});
</script>

<style scoped>
.video-container {
    width: 100%;
    max-height: 70vh;
    overflow: hidden;
    background-color: #000;
}

.video-wrapper {
    width: 100%;
    margin: 0 auto;
    aspect-ratio: 16 / 9;
    position: relative;
}

.video-element {
    width: 100%;
    height: 100%;
    display: block;
}

.video-placeholder {
    position: absolute;
    inset: 0;
    background: #1e1e1e;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
    z-index: 2;
}

.loader {
    animation: pulse 1.5s infinite;
}

.video-navigation {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    z-index: 5;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.video-navigation.controls-visible {
    opacity: 1;
}

.navigation-btn {
    background-color: rgba(0, 0, 0, 0.5) !important;
    pointer-events: auto;
    transition:
        transform 0.3s ease,
        opacity 0.3s ease;
    height: 48px !important;
    width: 48px !important;
    min-width: 48px !important;
}

.navigation-btn:hover {
    transform: scale(1.1);
}

.prev-btn {
    margin-right: auto;
}

.next-btn {
    margin-left: auto;
}

:deep(.v-skeleton-loader .v-skeleton-loader__bone) {
    margin: 0 !important;
}

@keyframes pulse {
    0% {
        opacity: 0.4;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0.4;
    }
}

.video-description-card {
    font-size: 0.875rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    padding: 1rem;
    width: 50%;
    margin-left: 1rem;
    margin-right: 1rem;
}

@media (max-width: 768px) {
    .video-container {
        max-height: 50vh;
    }
}
</style>

<style>
.plyr {
    --plyr-color-main: #461cdc;
    width: 100%;
    height: 100%;
    max-height: 70vh;
}
</style>

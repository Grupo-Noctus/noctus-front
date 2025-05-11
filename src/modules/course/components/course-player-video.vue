<template>
    <div class="video-container">
        <div
            class="video-wrapper"
            @mouseenter="showControls = true"
            @mouseleave="showControls = false"
        >
            <div v-if="isLoading" class="video-placeholder">
                <div class="loader">Carregando vídeo...</div>
            </div>

            <video
                v-show="!isLoading"
                ref="playerRef"
                playsinline
                controls
                class="video-element"
            ></video>

            <div class="video-navigation" :class="{ 'controls-visible': showControls }">
                <v-btn
                    icon
                    variant="text"
                    color="white"
                    class="navigation-btn prev-btn"
                    :disabled="!hasPreviousVideo || isLoading"
                    size="large"
                    @click="playPreviousVideo"
                >
                    <v-icon size="large">mdi-skip-previous</v-icon>
                </v-btn>
                <v-btn
                    icon
                    variant="text"
                    color="white"
                    class="navigation-btn next-btn"
                    :disabled="!hasNextVideo || isLoading"
                    size="large"
                    @click="playNextVideo"
                >
                    <v-icon size="large">mdi-skip-next</v-icon>
                </v-btn>
            </div>
        </div>
    </div>

    <div class="d-flex align-center flex-wrap rounded-0" variant="text">
        <v-row no-gutters class="w-100 mx-3 border-b-sm d-flex flex-wrap justify-space-between">
            <v-col cols="12" sm="12" md="12" lg="auto" class="font-weight-bold text-body-h6">
                <div class="pa-3">{{ currentVideoTitle }}</div>
            </v-col>

            <v-col
                cols="12"
                sm="12"
                md="12"
                lg="auto"
                class="d-flex align-center justify-end flex-wrap"
            >
                <v-btn
                    append-icon="mdi mdi-book-education-outline "
                    variant="text"
                    class="text-capitalize text"
                    size="small"
                >
                    detalhado
                </v-btn>
                <v-btn
                    append-icon="mdi-book-arrow-down-outline"
                    variant="text"
                    class="text-capitalize"
                    size="small"
                >
                    material
                </v-btn>
            </v-col>
        </v-row>
        <div></div>
    </div>

    <v-card variant="tonal" class="text-body-2 my-4 border-b-sm pa-3 w-50 mx-3">
        <span class="font-weight-bold">descrição:</span>
        {{ currentVideoDescription }}
    </v-card>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, nextTick, watch } from "vue";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import { useCourseStore } from "../course.store";

const courseStore = useCourseStore();
const courseVideoUrl = computed(() => courseStore.courseVideoUrl);

const playerRef = ref<HTMLVideoElement | null>(null);
const playerInstance = ref<Plyr | null>(null);
const isLoading = ref(true);
const showControls = ref(false);

const selectedVideo = computed(() => courseStore.selectedVideo);
const skipContent = computed(() => courseStore.skipVideo);

const currentVideoTitle = computed(() => {
    return selectedVideo.value.content.name || "título indisponível";
});

const currentVideoDescription = computed(() => {
    return selectedVideo.value.content.description || "indisponível no momento";
});

const hasPreviousVideo = computed(() => {
    return skipContent.value.prevContentOrder;
});
const hasNextVideo = computed(() => skipContent.value.nextContentOrder);

const loadVideoByIndex = async (order: number, mode: string) => {
    isLoading.value = true;
    await courseStore.getCourseVideoUrl(order, mode);
};

const playPreviousVideo = () => {
    if (!hasPreviousVideo.value) return;

    loadVideoByIndex(hasPreviousVideo.value, "prev");
};

const playNextVideo = () => {
    if (!hasNextVideo.value) return;
    loadVideoByIndex(hasNextVideo.value, "next");
};

// Carrega vídeo ao montar
onMounted(async () => {
    await nextTick();
    // Carrega o primeiro vídeo da list
    courseStore.setSelectedContent();
    await courseStore.getCourseVideoUrl(1, "nada");
});

// Inicializa player quando URL estiver pronta
watch(courseVideoUrl, async (newUrl) => {
    if (newUrl && playerRef.value) {
        if (!playerInstance.value) {
            playerInstance.value = new Plyr(playerRef.value, {
                ratio: "16:9",
                // Controlar o tamanho máximo do player
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
            isLoading.value = false;
        });
    }
});
</script>

<style scoped>
.video-container {
    width: 100%;
    max-height: 70vh; /* Limita a altura máxima do vídeo */
    overflow: hidden;
    background-color: #000;
}

.video-wrapper {
    width: 100%;
    margin: 0 auto; /* Centraliza horizontalmente */
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

/* Estilos para os botões de navegação */
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
    pointer-events: none; /* Permite clicar através da div de navegação */
    opacity: 0;
    transition: opacity 0.3s ease;
}

.video-navigation.controls-visible {
    opacity: 1;
}

.navigation-btn {
    background-color: rgba(0, 0, 0, 0.5) !important;
    pointer-events: auto; /* Habilita cliques nos botões */
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

/* Ajuste responsivo para telas menores */
@media (max-width: 768px) {
    .video-container {
        max-height: 50vh;
    }
}
</style>

<style>
/* Global - NÃO scoped */
.plyr {
    --plyr-color-main: #461cdc;
    width: 100%;
    height: 100%;
    max-height: 70vh; /* Controle adicional para o player Plyr */
}
</style>

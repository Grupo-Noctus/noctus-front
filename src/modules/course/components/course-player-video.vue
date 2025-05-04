<template>
    <div class="video-container">
        <div class="video-wrapper">
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
        </div>
    </div>

    <div class="d-flex align-center rounded-0" variant="text">
        <div class="font-weight-bold text-body-h6 border-b-sm pa-3 w-100 mx-3">
            Introduction to NestJs
        </div>
    </div>
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

// Carrega vídeo ao montar
onMounted(async () => {
    await nextTick();
    await courseStore.getCourseVideoUrl(
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    );
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

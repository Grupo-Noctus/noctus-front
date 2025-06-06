<template>
    <v-row class="mt-5">
        <v-col cols="12" class="pa-2">
            <h1 class="text-h4 mb-0 text-center">Gestão</h1>
        </v-col>
    </v-row>

    <v-card class="gestao-container" variant="text">
        <v-card class="gestao-wrapper" variant="text">
            <v-card
                v-for="item in cards"
                :key="item.title"
                class="gestao-card border-sm"
                variant="text"
                link
                @click="navigateTo(item.navigateTo)"
            >
                <v-card-text>
                    <p class="gestao-title">{{ item.title }}</p>

                    <p class="my-2">Descrição:</p>

                    <div class="gestao-desc">
                        {{ item.description }}
                    </div>
                </v-card-text>

                <v-card-actions>
                    <v-btn
                        :color="cardButton"
                        text="gerenciar"
                        variant="text"
                        @click="navigateTo(item.navigateTo)"
                    ></v-btn>
                </v-card-actions>
            </v-card>
        </v-card>
    </v-card>
</template>

<script setup lang="ts">
import router from "@/plugins/router/router";
import { useIndexStore } from "@/stores/index.store";
import { computed } from "vue";

const indexStore = useIndexStore();

const cardButton = computed(() => {
    return indexStore.isDark ? "#6bff50" : "primary";
});

const cards = [
    {
        title: "Cursos",
        description: "gerencie módulos, materiais, e vídeo.",
        navigateTo: "Courses",
    },
    {
        title: "Matrículas",
        description: "gerencie matrículas, controle acessos de alunos para cursos.",
        navigateTo: "CourseEnrollment",
    },
    {
        title: "Alunos",
        description: "gerencie e visualize dados de alunos.",
        navigateTo: "Users",
    },
    {
        title: "Certificado",
        description: "gerencie certificados, crie e personalize para vários cursos.",
        navigateTo: "Certificate",
    },
];

const navigateTo = (routeName: string) => {
    router.push({ name: routeName });
};
</script>

<style scoped>
.gestao-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.gestao-wrapper {
    display: flex;
    flex-wrap: wrap;
    padding: 40px;
    gap: 20px;
    width: 700px;
    height: fit-content;
}

.gestao-card {
    width: 300px;
    height: fit-content;
    margin: 0 auto;
    border-radius: 8px;
}

.gestao-title {
    font-size: 1.5rem;
    font-weight: 900;
    margin-bottom: 20px;
    height: 40px;
}

.gestao-desc {
    height: 40px;
}
</style>

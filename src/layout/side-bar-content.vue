<template>
    <v-card>
        <v-layout>
            <v-app-bar color="primary">
                <v-app-bar-nav-icon
                    variant="text"
                    @click.stop="drawer = !drawer"
                ></v-app-bar-nav-icon>

                <v-toolbar-title>Instituto Matera</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon="mdi mdi-theme-light-dark" variant="text" @click="toggleTheme"></v-btn>
            </v-app-bar>

            <v-navigation-drawer
                v-model="drawer"
                :location="$vuetify.display.mobile ? 'bottom' : undefined"
                temporary
                color="secondary"
            >
                <v-list>
                    <v-list-item
                        v-for="item in items"
                        :key="item.value"
                        @click="navigateToMainContent(item.title)"
                    >
                        {{ item.value }}
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>

            <v-main class="px-4">
                <router-view></router-view>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import router from "@/plugins/router/router";
import { useIndexStore } from "@/stores/index.store";

const indexStore = useIndexStore();

const drawer = ref(false);

const toggleTheme = () => {
    indexStore.changeTheme();
};

const items = [
    { title: "Home", value: "home" },
    { title: "Student", value: "alunos" },
];
const navigateToMainContent = (title: string) => {
    router.push({ name: title });
};
</script>

<style scoped></style>

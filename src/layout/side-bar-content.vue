<template>
    <v-app>
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

        <v-app-bar class="elevation-0" color="primary">
            <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" />
            <v-toolbar-title>Instituto Matera</v-toolbar-title>
            <v-spacer />
            <v-btn icon="mdi mdi-theme-light-dark" variant="text" @click="toggleTheme" />
        </v-app-bar>

        <v-main>
            <router-view />
        </v-main>
        <Notivue v-slot="item">
            <Notification :item="item">
                <div v-if="item.props.progress">
                    <NotificationProgress :item="item" />
                </div>
            </Notification>
        </Notivue>
    </v-app>
</template>

<script setup lang="ts">
import { ref } from "vue";
import router from "@/plugins/router/router";
import { useIndexStore } from "@/stores/index.store";
import { Notivue, Notification, NotificationProgress } from "notivue";

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

<template>
    <v-card style="min-height: 100vh">
        <v-layout>
            <v-app-bar color="primary" class="elevation-0">
                <v-app-bar-nav-icon
                    variant="text"
                    @click.stop="drawer = !drawer"
                ></v-app-bar-nav-icon>

                <v-avatar size="50" style="margin-right: 0px">
                    <v-img src="src/assets/matera-logo.png" alt="Logo Matera" />
                </v-avatar>
                <v-toolbar-title>Instituto Matera</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon="mdi mdi-theme-light-dark" variant="text" @click="toggleTheme"></v-btn>
            </v-app-bar>

            <v-navigation-drawer
                v-model="drawer"
                :location="$vuetify.display.mobile ? 'bottom' : undefined"
                temporary
            >
                <div class="w-100 h-100 d-flex flex-column justify-space-between">
                    <v-list :lines="false" density="compact" nav slim>
                        <side-bar-item
                            v-for="(item, i) in items"
                            :key="i"
                            :text="item.text"
                            :icon="item.icon"
                            :value="item"
                            :naviga-to="item.navigateTo"
                        />
                    </v-list>

                    <user-list-item
                        :userName="userName"
                        :userEmail="userEmail"
                        :avatarUrl="userImage"
                    ></user-list-item>
                </div>
            </v-navigation-drawer>

            <v-main style="min-height: 100vh">
                <router-view></router-view>
            </v-main>
        </v-layout>
    </v-card>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useIndexStore } from "@/stores/index.store";
import SideBarItem from "@/components/side-bar/side-bar-item.vue";
import UserListItem from "@/components/side-bar/user-list-item.vue";
import { useAuthStore } from "@/modules/auth/auth.store";

const indexStore = useIndexStore();
const authStore = useAuthStore();

const drawer = ref(false);
const userEmail = ref(authStore.user.email || "E-mail inválido");
const userName = ref(authStore.user.username || "desconhecido");
const userImage = ref(authStore.user.image || "https://cdn.vuetifyjs.com/images/john.png");

const toggleTheme = () => {
    indexStore.changeTheme();
};

const items = [
    { text: "estudante", icon: "mdi-account", navigateTo: "Student" },
    { text: "curso", icon: "mdi-bookshelf", navigateTo: "Course" },
];
</script>

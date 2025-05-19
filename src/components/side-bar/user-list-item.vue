<template>
    <v-list-item class="align-items-start" density="compact">
        <template v-slot:prepend>
            <v-avatar size="40">
                <v-img :src="avatarUrl" />
            </v-avatar>
        </template>

        <template v-slot:title>
            <div class="text-truncate text-body-2 text-capitalize">
                {{ userName }}
            </div>
        </template>

        <template v-slot:subtitle>
            <div class="text-truncate text-body-2">
                {{ userEmail }}
            </div>
        </template>

        <template v-slot:append>
            <v-menu location="end" offset="6">
                <template v-slot:activator="{ props }">
                    <v-btn
                        icon="mdi-menu-swap"
                        size="small"
                        density="compact"
                        variant="text"
                        v-bind="props"
                    />
                </template>

                <div class="bg-surface rounded border-sm py-1" style="width: 110px">
                    <template v-for="(item, index) in menuItems" :key="index">
                        <div
                            class="menu-item"
                            :class="hoverOnMenuitem"
                            @click="handleMenuClick(item.navigateTo)"
                        >
                            <v-icon
                                size="small"
                                class="me-2"
                                :style="item.icon === 'mdi-logout' ? 'width: 10px' : ''"
                                :color="item.color || undefined"
                            >
                                {{ item.icon }}
                            </v-icon>
                            <span :class="item.color ? 'text-' + item.color : ''">
                                {{ item.label }}
                            </span>
                        </div>

                        <v-divider v-if="item.dividerAfter" class="my-1" />
                    </template>
                </div>
            </v-menu>
        </template>
    </v-list-item>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useIndexStore } from "@/stores/index.store";
import router from "@/plugins/router/router";
import { logOut } from "@/plugins/api/api";

const indexStore = useIndexStore();

defineProps({
    userName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    avatarUrl: {
        type: String,
        required: true,
    },
});

const hoverOnMenuitem = computed(() => {
    return indexStore.isDark ? "dark-menu-item" : "light-menu-item";
});

const menuItems = [
    {
        label: "Sign in",
        icon: "mdi-login",
        action: "signin",
        navigateTo: "auth/register",
    },
    {
        label: "Sign up",
        icon: "mdi-account-plus",
        action: "signup",
        dividerAfter: true,
        navigateTo: "auth/login",
    },
    {
        label: "Log out",
        icon: "mdi-logout",
        action: "logout",
        color: "red",
        navigateTo: "auth/login",
    },
];

function handleMenuClick(navigateTo: string) {
    logOut(navigateTo);
}
</script>

<style scoped>
.menu-item {
    display: flex;
    align-items: center;
    padding: 12px 8px;
    font-size: 0.875rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.light-menu-item:hover {
    background-color: #f3f3f3;
}

.dark-menu-item:hover {
    background-color: #2a2a2a;
}
</style>

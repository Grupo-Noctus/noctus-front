<template>
    <div @click="navigateToMainContent(navigaTo)">
        <v-list-item :value="value" color="primary" class="mb-2">
            <template v-slot:prepend>
                <v-icon :icon="icon" />
            </template>

            <v-list-item-title>
                {{ text }}
            </v-list-item-title>
        </v-list-item>
    </div>
</template>

<script setup lang="ts">
import router from "@/plugins/router/router";

defineProps({
    text: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    navigaTo: {
        type: String,
        required: true,
    },
    value: {
        type: [String, Object],
        default: () => ({}),
    },
});

const navigateToMainContent = (routeName: string) => {
    router.push({ name: routeName });
};
</script>

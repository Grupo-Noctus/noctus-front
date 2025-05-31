<template>
    <v-menu>
        <template v-slot:activator="{ props }">
            <div class="d-flex justify-end mb-3">
                <v-btn
                    v-bind="props"
                    icon="mdi-dots-vertical"
                    density="compact"
                    size="small"
                    variant="text"
                ></v-btn>
            </div>
        </template>
        <v-card class="d-flex flex-column gap-2 rounded-0">
            <v-btn
                prepend-icon="mdi-pencil"
                class="text-primary text-caption"
                @click="emits('edit', item)"
                >Editar</v-btn
            >
            <v-btn
                prepend-icon="mdi-delete"
                class="text-red text-caption"
                @click="emits('delete', item)"
                >Deletar</v-btn
            >
        </v-card>
    </v-menu>
</template>

<script setup lang="ts">
import { PropType } from "vue";

const props = defineProps({
    item: {
        type: Object as PropType<unknown>,
        required: true,
    },
});

const emits = defineEmits(["edit", "delete"]);
</script>

<style scoped></style>

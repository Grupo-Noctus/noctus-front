<template>
    <v-dialog v-model="dialogModel" max-width="500">
        <v-card>
            <v-card-title class="text-h6">
                {{ title }}
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="text-body-1">
                Tem certeza que deseja remover
                <span class="text-body-2"> "{{ itemToDelete }}"</span>?
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" @click="cancel">Cancelar</v-btn>
                <v-btn color="error" variant="tonal" @click="confirm">Confirmar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { computed } from "vue";

const emits = defineEmits(["cancel", "confirm", "update:modelValue"]);

const props = defineProps<{
    title: string;
    itemToDelete?: string;
    modelValue?: boolean;
}>();

const dialogModel = computed({
    get: () => props.modelValue ?? false,
    set: (value: boolean) => emits("update:modelValue", value),
});

const cancel = () => {
    dialogModel.value = false;
    emits("cancel");
};

const confirm = () => {
    dialogModel.value = false;
    emits("confirm");
};
</script>

<style scoped></style>

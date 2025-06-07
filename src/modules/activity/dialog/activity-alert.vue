<template>
    <div class="text-center">
        <v-dialog v-model="internalDialog" max-width="400" persistent>
            <template v-slot:activator="{ props: activatorProps }">
                <v-btn v-bind="activatorProps" color="primary">
                    Finalizar atividade?
                </v-btn>
            </template>

            <v-card
                text="Essa ação é permanente e não poderá ser desfeita."
                title="Deseja finalizar a atividade?">
                <template v-slot:actions>
                    <v-spacer></v-spacer>

                    <v-btn @click="handleCancel">
                        Não
                    </v-btn>

                    <v-btn @click="handleConfirm">
                        Sim
                    </v-btn>
                </template>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'

const props = defineProps<{
  dialog: boolean;
}>()

const emit = defineEmits(['update:dialog', 'response']);

const internalDialog = ref(props.dialog);

watch(() => props.dialog, (newVal) => {
  internalDialog.value = newVal
})

watch(internalDialog, (newVal) => {
  emit('update:dialog', newVal)
})

function handleConfirm() {
  emit('response', 'sim')
  internalDialog.value = false
}

function handleCancel() {
  emit('response', 'nao')
  internalDialog.value = false
}

</script>
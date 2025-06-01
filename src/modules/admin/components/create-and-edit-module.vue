<template>
    <v-dialog v-model="dialogModel" max-width="500">
        <template v-if="!isExternalControl" v-slot:activator="{ props: activatorProps }">
            <v-btn
                v-bind="activatorProps"
                variant="elevated"
                size="default"
                block
                prepend-icon="mdi-plus"
                color="primary"
            >
                criar módulo
            </v-btn>
        </template>

        <v-card elevation="0">
            <v-card-title class="text-h5 px-4 pt-4">
                {{ isEditMode ? "Editar Módulo" : "Criar Módulo" }}
            </v-card-title>
            <Form @submit="submit">
                <v-container>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field
                                v-model="createModuleForm.name"
                                label="Nome"
                                required
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-textarea
                                v-model="createModuleForm.description"
                                label="Descrição"
                                required
                                clearable
                                row-height="25"
                                no-resize
                                :rows="4"
                                variant="outlined"
                            ></v-textarea>
                        </v-col>
                        <v-col cols="12" class="d-flex justify-end">
                            <v-btn class="me-4" @click="handleCancel">Cancelar</v-btn>
                            <v-btn type="submit" color="primary">
                                {{ isEditMode ? "Salvar" : "Criar" }}
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </Form>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from "vue";
import type { TContentModule } from "@/modules/course/course.types";
import { Form } from "vee-validate";
import * as yup from "yup";
import { pushMessageNotification } from "@/utils/notivue-base";

defineOptions({
    name: "CreateAndEditModule",
});

const props = defineProps<{
    modelValue?: boolean;
    isExternalControl?: boolean;
    editData?: TContentModule | null;
}>();

const emits = defineEmits(["confirmCreate", "update:modelValue", "cancel"]);

const dialogModel = computed({
    get: () => props.modelValue ?? false,
    set: (value) => emits("update:modelValue", value),
});

const isEditMode = computed(() => !!props.editData);

const createModuleForm = reactive({
    name: "",
    description: "",
});

const schema = yup.object({
    name: yup.string().required("Nome é obrigatório"),
    description: yup.string().required("Descrição é obrigatória"),
});

async function submit() {
    try {
        await schema.validate(createModuleForm);

        emits("confirmCreate", {
            ...createModuleForm,
            id: props.editData?.id,
        });

        dialogModel.value = false;
        resetValues();
    } catch (error: any) {
        if (error instanceof yup.ValidationError) {
            pushMessageNotification({
                type: "error",
                title: isEditMode.value ? "Erro ao editar módulo" : "Erro ao criar módulo",
                message: error.message,
                duration: 3000,
            });
        } else {
            pushMessageNotification({
                type: "error",
                title: "Um erro inesperado ocorreu",
                message: error.message,
                duration: 3000,
            });
        }
    }
}

watch(
    () => props.editData,
    (newValue) => {
        if (newValue) {
            createModuleForm.name = newValue.name;
            createModuleForm.description = newValue.description;
        } else {
            resetValues();
        }
    },
    { immediate: true },
);

function resetValues() {
    createModuleForm.name = "";
    createModuleForm.description = "";
}

function handleCancel() {
    dialogModel.value = false;
    resetValues();
    emits("cancel");
}
</script>

<style scoped></style>

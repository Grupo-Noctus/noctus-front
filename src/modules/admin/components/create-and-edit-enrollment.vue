<template>
    <v-dialog v-model="dialogModel" max-width="600">
        <v-card elevation="0">
            <v-card-title class="text-h5 px-4 pt-4">
                {{ isEditMode ? "Editar Matrícula" : "Criar Matrícula" }}
            </v-card-title>
            <Form :validation-schema="enrollmentCreateRules" @submit="submit">
                <v-container>
                    <v-row>
                        <v-col cols="12" md="12">
                            <Field v-slot="{ field, errors }" name="studentEmail">
                                <v-text-field
                                    v-bind="field"
                                    :error-messages="errors"
                                    label="Email do aluno"
                                    required
                                    variant="outlined"
                                ></v-text-field>
                            </Field>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-btn
                                variant="elevated"
                                elevation="0"
                                color="primary"
                                type="submit"
                                block
                            >
                                {{ isEditMode ? "Salvar alterações" : "Criar matrícula" }}
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </Form>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { pushMessageNotification } from "@/utils/notivue-base";
import { Form, Field } from "vee-validate";
import { computed, reactive, watch } from "vue";
import * as yup from "yup";

const props = defineProps<{
    modelValue?: boolean;
    isExternalControl?: boolean;
    studentEmail?: string;
}>();

const emits = defineEmits<{
    "update:modelValue": [value: boolean];
    confirmCreate: [studentEmail: string];
    cancel: [];
}>();

const dialogModel = computed({
    get: () => props.modelValue ?? false,
    set: (value) => emits("update:modelValue", value),
});

const isEditMode = computed(() => !!props.studentEmail);

const createEnrollmentForm = reactive({
    studentEmail: "",
});

watch(
    () => props.studentEmail,
    (newValue) => {
        if (newValue) {
            createEnrollmentForm.studentEmail = newValue;
        } else {
            resetValues();
        }
    },
    { immediate: true },
);

const enrollmentCreateRules = {
    studentEmail: yup
        .string()
        .required("O email é obrigatório")
        .email("Por favor, insira um email válido"),
};

function resetValues() {
    createEnrollmentForm.studentEmail = "";
}

function handleCancel() {
    dialogModel.value = false;
    resetValues();
    emits("cancel");
}

async function submit(values: Record<string, any>) {
    try {
        emits("confirmCreate", values.studentEmail as string);
        dialogModel.value = false;
        resetValues();
    } catch (error: any) {
        if (error instanceof yup.ValidationError) {
            pushMessageNotification({
                type: "error",
                title: isEditMode.value ? "Erro ao editar matrícula" : "Erro ao criar matrícula",
                message: error.message,
                duration: 3000,
            });
        } else {
            pushMessageNotification({
                type: "error",
                title: "Um erro inesper ado ocorreu",
                message: error.message,
                duration: 3000,
            });
        }
    }
}
</script>

<style scoped></style>

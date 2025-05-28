<template>
    <v-dialog v-model="isDialogOpen" max-width="600">
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn
                v-bind="activatorProps"
                variant="elevated"
                size="default"
                block
                prepend-icon="mdi-plus"
                color="primary"
            >
                criar curso
            </v-btn>
        </template>

        <v-card elevation="0">
            <Form @submit="submit">
                <v-container>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field
                                v-model="createCourseForm.name"
                                label="Nome do curso"
                                required
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-textarea
                                v-model="createCourseForm.description"
                                label="Descrição"
                                required
                                clearable
                                row-height="25"
                                no-resize
                                :rows="4"
                                variant="outlined"
                            ></v-textarea>
                        </v-col>
                        <v-col>
                            <v-number-input
                                v-model="createCourseForm.duration"
                                :min="1"
                                :reverse="false"
                                controlVariant="stacked"
                                label="Duração"
                                :hideInput="false"
                                :inset="false"
                                variant="outlined"
                            ></v-number-input>
                        </v-col>
                        <v-col>
                            <v-file-input
                                v-model="createCourseForm.image"
                                accept="image/png, image/jpeg"
                                label="imagem do curso"
                                placeholder="Upload your photos"
                                prepend-icon="mdi-image-area"
                                variant="outlined"
                            ></v-file-input>
                        </v-col>
                        <v-col cols="12" class="d-flex justify-end">
                            <v-btn class="me-4" @click="resetValues"> reiniciar </v-btn>
                            <v-btn type="submit"> criar </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </Form>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { pushMessageNotification } from "@/utils/notivue-base";
import { Form } from "vee-validate";
import { reactive, ref } from "vue";
import * as yup from "yup";

const emits = defineEmits(["confirmCreate"]);

const isDialogOpen = ref(false);

const createCourseForm = reactive({
    name: "",
    description: "",
    duration: 1,
    image: null,
});

const MAX_FILE_SIZE_KB = 1024 * 1000;

const courseCreateRules = yup.object({
    name: yup.string().required("Nome é obrigatório"),
    description: yup
        .string()
        .max(150, "A descrição deve ter no máximo 150 caracteres")
        .required("Descrição é obrigatória"),
    duration: yup
        .number()
        .min(1, "A duração deve ser no mínimo 1 dia")
        .required("Duração é obrigatória"),
    image: yup
        .mixed()
        .optional()
        .nullable()
        .test("fileSize", `O arquivo deve ter no máximo ${MAX_FILE_SIZE_KB / 1024}KB`, (value) => {
            if (!value) {
                return true;
            }

            if (Array.isArray(value)) {
                if (value.length === 0) {
                    return true;
                }
                const file = value[0];

                return file && file.size && file.size <= MAX_FILE_SIZE_KB;
            }

            if (value instanceof File) {
                return value.size <= MAX_FILE_SIZE_KB;
            }

            if (value instanceof FileList) {
                if (value.length === 0) {
                    return true;
                }
                const file = value[0];

                return file && file.size && file.size <= MAX_FILE_SIZE_KB;
            }

            return true;
        })
        .test("fileType", "Tipo de imagem inválido (apenas PNG e JPEG)", (value) => {
            if (!value) {
                return true;
            }

            let file = null;

            if (Array.isArray(value) && value.length > 0) {
                file = value[0];
            } else if (value instanceof File) {
                file = value;
            } else if (value instanceof FileList && value.length > 0) {
                file = value[0];
            }

            if (!file) {
                return true;
            }

            const validTypes = ["image/jpeg", "image/png", "image/jpg"];
            return validTypes.includes(file.type);
        }),
});

function resetValues() {
    createCourseForm.name = "";
    createCourseForm.description = "";
    createCourseForm.duration = 1;
    createCourseForm.image = null;
}

async function submit() {
    try {
        await courseCreateRules.validate(createCourseForm);

        emits("confirmCreate", createCourseForm);

        isDialogOpen.value = false;
        resetValues();
    } catch (error: any) {
        if (error instanceof yup.ValidationError) {
            pushMessageNotification({
                type: "error",
                title: "Erro ao criar vídeo",
                message: error.message,
                duration: 3000,
            });
        } else {
            pushMessageNotification({
                type: "error",
                title: "um erro inesperado ocorreu",
                message: error.message,
                duration: 3000,
            });
        }
    }
}
</script>

<style scoped></style>

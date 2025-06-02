<template>
    <v-dialog v-model="dialogModel" max-width="600">
        <v-card elevation="0">
            <v-card-title class="text-h5 px-4 pt-4">
                {{ isEditMode ? "Editar Conteúdo" : "Criar Conteúdo" }}
            </v-card-title>
            <Form @submit="submit">
                <v-container>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field
                                v-model="createContentForm.name"
                                label="Nome do conteúdo"
                                required
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-textarea
                                v-model="createContentForm.description"
                                label="Descrição"
                                required
                                clearable
                                row-height="25"
                                no-resize
                                :rows="4"
                                variant="outlined"
                            ></v-textarea>
                        </v-col>
                        <v-col cols="12">
                            <v-file-input
                                v-model="createContentForm.video"
                                accept="video/mp4"
                                label="Arquivo de vídeo"
                                placeholder="Carregue seu vídeo (MP4, máx. 8MB)"
                                prepend-icon="mdi-video"
                                variant="outlined"
                                required
                                :rules="[(v) => !!v || 'Vídeo é obrigatório']"
                            ></v-file-input>
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
import { pushMessageNotification } from "@/utils/notivue-base";
import { Form } from "vee-validate";
import { computed, reactive, watch } from "vue";
import * as yup from "yup";
import type { TContentVideoModule } from "../admin.types";

const props = defineProps<{
    modelValue?: boolean;
    isExternalControl?: boolean;
    editData?: TContentVideoModule | null;
}>();

const emits = defineEmits<{
    "update:modelValue": [value: boolean];
    confirmCreate: [content: TContentVideoModule];
    cancel: [];
}>();

const dialogModel = computed({
    get: () => props.modelValue ?? false,
    set: (value) => emits("update:modelValue", value),
});

const isEditMode = computed(() => !!props.editData);

const createContentForm = reactive({
    name: "",
    description: "",
    video: null as File | null,
});

watch(
    () => props.editData,
    (newValue) => {
        if (newValue) {
            createContentForm.name = newValue.name;
            createContentForm.description = newValue.description;
        } else {
            resetValues();
        }
    },
    { immediate: true },
);

const MAX_VIDEO_SIZE = 30 * 1024 * 1024; // 30MB em bytes

const contentCreateRules = yup.object({
    name: yup.string().required("Nome é obrigatório"),
    description: yup
        .string()
        .max(150, "A descrição deve ter no máximo 150 caracteres")
        .required("Descrição é obrigatória"),
    video: yup
        .mixed()
        .test("fileRequired", "Vídeo é obrigatório", (value) => {
            if (isEditMode.value) return true;
            return value !== null && value !== undefined;
        })
        .test("fileSize", "O arquivo deve ter no máximo 30MB", (value) => {
            if (!value || isEditMode.value) return true;

            let file: File | null = null;

            if (value instanceof File) {
                file = value;
            } else if (value instanceof FileList && value.length > 0) {
                file = value[0];
            } else if (Array.isArray(value) && value.length > 0) {
                file = value[0];
            }

            if (!file) return false;
            return file.size <= MAX_VIDEO_SIZE;
        })
        .test("fileType", "Formato inválido (apenas MP4)", (value) => {
            if (!value || isEditMode.value) return true;

            let file: File | null = null;

            if (value instanceof File) {
                file = value;
            } else if (value instanceof FileList && value.length > 0) {
                file = value[0];
            } else if (Array.isArray(value) && value.length > 0) {
                file = value[0];
            }

            if (!file) return false;
            return file.type === "video/mp4";
        }),
});

function resetValues() {
    createContentForm.name = "";
    createContentForm.description = "";
    createContentForm.video = null;
}

function handleCancel() {
    dialogModel.value = false;
    resetValues();
    emits("cancel");
}

async function submit() {
    try {
        await contentCreateRules.validate(createContentForm);

        let videoFile: File | null = null;
        if (createContentForm.video) {
            if (createContentForm.video instanceof File) {
                videoFile = createContentForm.video;
            } else if (
                createContentForm.video instanceof FileList &&
                createContentForm.video.length > 0
            ) {
                videoFile = createContentForm.video[0];
            } else if (
                Array.isArray(createContentForm.video) &&
                createContentForm.video.length > 0
            ) {
                videoFile = createContentForm.video[0];
            }
        }
        emits("confirmCreate", {
            name: createContentForm.name,
            description: createContentForm.description,
            video: videoFile,
            id: props.editData?.id,
        });

        dialogModel.value = false;
        resetValues();
    } catch (error: any) {
        if (error instanceof yup.ValidationError) {
            pushMessageNotification({
                type: "error",
                title: isEditMode.value ? "Erro ao editar conteúdo" : "Erro ao criar conteúdo",
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
</script>

<style scoped></style>

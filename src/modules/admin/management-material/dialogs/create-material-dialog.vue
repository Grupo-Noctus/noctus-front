<template>
    <v-dialog v-model="dialogModel" max-width="600">
        <template v-if="!isExternalControl" v-slot:activator="{ props: activatorProps }">
            <v-btn v-bind="activatorProps" variant="elevated" size="default" block prepend-icon="mdi-plus"
                color="primary">
                criar material
            </v-btn>
        </template>

        <v-card elevation="0">
            <v-card-title class="text-h5 px-4 pt-4">
                {{ isEditMode ? "Editar Material" : "Criar Material" }}
            </v-card-title>
            <Form @submit="submit">
                <v-container>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field v-model="createMaterialForm.name" label="Nome do material" required
                                variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-textarea v-model="createMaterialForm.description" label="Descrição" required clearable
                                row-height="25" no-resize :rows="4" variant="outlined"></v-textarea>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-select v-model="createMaterialForm.type" label="Tipo de material"
                                :items="materialTypeOptions" item-title="text" item-value="value" required clearable
                                row-height="25" no-resize :rows="4" variant="outlined"></v-select>
                        </v-col>
                        <v-col>
                            <v-file-input v-model="createMaterialForm.file" accept="image/png, image/jpeg"
                                label="Material do curso" placeholder="Carregue seu material"
                                prepend-icon="mdi-archive-arrow-down-outline" variant="outlined"></v-file-input>
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
import { computed, reactive, ref, watch } from "vue";
import * as yup from "yup";
import { AdminService } from "../../admin.service";
import type { TMaterial } from "../../admin.types";
import { useRoute } from 'vue-router';
import { materialTypeOptions } from "./data/material-types-options";

const route = useRoute();

const materials = ref<TMaterial[]>([]);
const adminService = AdminService();
const MAX_FILE_SIZE_KB = 1024 * 1000;
const courseIdFromRoute = computed(() => Number(route.params.id));


const props = defineProps<{
    modelValue?: boolean;
    isExternalControl?: boolean;
    editData?: TMaterial | null;
}>();

const emits = defineEmits(["confirmCreate", "update:modelValue", "cancel"]);

const dialogModel = computed({
    get: () => props.modelValue ?? false,
    set: (value) => emits("update:modelValue", value),
});

const isEditMode = computed(() => !!props.editData);

const createMaterialForm = reactive({
    name: "",
    description: "",
    courseId: courseIdFromRoute.value,
    file: null as File | null,
    type: "",
    link: "https://link.com/material",
});

watch(
    () => props.editData,
    (newValue) => {
        if (newValue) {
            createMaterialForm.name = newValue.name;
            createMaterialForm.description = newValue.description;
            createMaterialForm.courseId = newValue.courseId;
            createMaterialForm.type = newValue.type;

        } else {
            resetValues();
        }
    },
    { immediate: true },
);

watch(
    () => createMaterialForm.courseId,
    (newValue) => {
        if (newValue) {
            fetchMaterials();
        } else {
            materials.value = [];
        }
    }
);

const fetchMaterials = async () => {
    if (!createMaterialForm.courseId) {
        materials.value = [];
        return;
    }

    try {
        const response = await adminService.getMaterialsService(createMaterialForm.courseId);
        materials.value = response;
    } catch (error) {
        pushMessageNotification({
            type: "error",
            message: "Erro ao carregar materiais.",
            duration: 3000,
        });
        console.error(error);
    }
};


const materialCreateRules = yup.object({
    name: yup.string().required("Nome é obrigatório"),
    description: yup
        .string()
        .max(150, "A descrição deve ter no máximo 150 caracteres")
        .required("Descrição é obrigatória"),
    file: yup
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
        .test("fileType", "Tipo de arquivo inválido", (value) => {
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

            const validTypes = [
                "image/jpeg",
                "image/png",
                "image/jpg",
                "application/pdf",
                "plain/text"
            ];
            return validTypes.includes(file.type);
        }),
});

function resetValues() {
    createMaterialForm.name = "";
    createMaterialForm.description = "";
    createMaterialForm.file = null;
}

function handleCancel() {
    dialogModel.value = false;
    resetValues();
    emits("cancel");
}

async function submit() {
    try {
        await materialCreateRules.validate(createMaterialForm);

        emits("confirmCreate", {
            ...createMaterialForm,
            id: props.editData?.courseId,
        });

        dialogModel.value = false;
        resetValues();
    } catch (error: any) {
        if (error instanceof yup.ValidationError) {
            pushMessageNotification({
                type: "error",
                title: isEditMode.value ? "Erro ao editar material" : "Erro ao criar material",
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

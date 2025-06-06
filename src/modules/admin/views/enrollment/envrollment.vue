<template>
    <v-card class="pa-3 d-flex justify-space-between align-center" elevation="0">
        <div class="text-h6 text-center" variant="text">Matrículas</div>

        <v-btn
            prepend-icon="mdi-plus"
            density="default"
            size="small"
            color="primary"
            elevation="0"
            @click="handleWishToCreateEnrollment"
            >criar matrícula</v-btn
        >
        <create-and-edit-enrollment
            v-model="isCreateEnrollmentDialogOpen"
            :is-external-control="true"
            :edit-data="selectedEnrollment"
            @confirm-create="handleFormSubmit"
            @cancel="handleDialogCancel"
        />
    </v-card>
    <v-divider class="mb-4"></v-divider>
    <v-card
        elevation="0"
        style="width: 90%"
        class="mx-auto pa-4 d-flex justify-space-center align-center ga-4 flex-wrap"
    >
        <v-card v-if="loading" elevation="0" class="text-center pa-4 text-h6">
            Carregando...
        </v-card>
        <v-card
            v-for="enrollment in enrollments"
            v-else
            :key="enrollment.idEnrollment"
            elevation="0"
            class="border-sm"
            style="width: fit-content"
        >
            <v-card elevation="0">
                <v-card-title>
                    {{ enrollment.name }}
                </v-card-title>
                <v-card-text>
                    {{ enrollment.email }}
                </v-card-text>
                <div class="container-subtitle">
                    <v-card-subtitle class="mb-3 text-body-2">
                        Expira em:
                        <span :class="isExpired(enrollment.expiresAt) ? 'text-red' : ''">{{
                            formatDate(enrollment.expiresAt)
                        }}</span>
                    </v-card-subtitle>

                    <div class="mb-3 pe-4 text-body-2">
                        <v-chip
                            v-if="isExpired(enrollment.expiresAt)"
                            color="red"
                            class="text-body-2 text-uppercase"
                            size="small"
                            label
                            style="font-weight: bold"
                            variant="text"
                        >
                            expirado
                        </v-chip>
                    </div>
                </div>
                <div class="d-flex justify-end flex-wrap pa-2 ga-2">
                    <v-btn size="small" variant="tonal" color="#6BFF50" disabled>
                        <v-icon>mdi-pencil</v-icon>
                        Editar
                    </v-btn>
                    <v-btn
                        size="small"
                        variant="tonal"
                        color="error"
                        @click="handleWishToDeleteEnrollment(enrollment)"
                    >
                        <v-icon>mdi-delete</v-icon>
                        Excluir
                    </v-btn>
                </div>
            </v-card>
        </v-card>

        <confirmation-dialog
            v-model="isDeleteDialogOpen"
            title="Remover matrícula"
            :item-to-delete="selectedEnrollment?.email"
            @confirm="handleConfirmDialog"
            @cancel="handleCancelDialog"
        />
    </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { AdminService } from "../../admin.service";
import type { TEnrollment } from "../../admin.types";
import CreateAndEditEnrollment from "../../components/create-and-edit-enrollment.vue";
import ConfirmationDialog from "@/components/dialogs/confirmation-dialog.vue";

const adminService = AdminService();
const route = useRoute();
const courseId = route.params.id;

const enrollments = ref<TEnrollment[]>([]);
const loading = ref(false);
const isCreateEnrollmentDialogOpen = ref(false);
const isDeleteDialogOpen = ref(false);
const selectedEnrollment = ref<TEnrollment | null>(null);

const handleWishToCreateEnrollment = () => {
    isCreateEnrollmentDialogOpen.value = true;
    selectedEnrollment.value = null;
};

const handleFormSubmit = async (studentEmail: string) => {
    const data = await adminService.createEnrollmentService(studentEmail, +courseId);
    if (data) {
        isCreateEnrollmentDialogOpen.value = false;
        fetchEnrollment();
    }
};

const handleDialogCancel = () => {
    isCreateEnrollmentDialogOpen.value = false;
};

const handleWishToDeleteEnrollment = (enrollment: TEnrollment) => {
    selectedEnrollment.value = enrollment;
    isDeleteDialogOpen.value = true;
};

const handleConfirmDialog = async () => {
    if (!selectedEnrollment.value?.idEnrollment) return;

    const data = await adminService.deleteEnrollmentService(selectedEnrollment.value.idEnrollment);
    if (data) {
        isDeleteDialogOpen.value = false;
        selectedEnrollment.value = null;
        fetchEnrollment();
    }
};

const handleCancelDialog = () => {
    isDeleteDialogOpen.value = false;
    selectedEnrollment.value = null;
};

const fetchEnrollment = async () => {
    try {
        loading.value = true;
        const response = await adminService.getEnrollmentService(+courseId);
        enrollments.value = response;
        loading.value = false;
    } catch (error) {
        console.error(error);
    }
};

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
};

const isExpired = (dateString: string): boolean => {
    return new Date(dateString) < new Date();
};

onMounted(() => {
    fetchEnrollment();
});
</script>

<style scoped>
.container-subtitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>

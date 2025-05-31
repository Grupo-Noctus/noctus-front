<template>
    <div class="w-100">
        <create-and-edit-module
            v-model="isEditModuleDialogOpen"
            :is-external-control="true"
            :edit-data="selectedModule"
            @confirm-create="handleEditModuleConfirm"
            @cancel="handleEditModuleCancel"
        />

        <create-and-edit-content
            v-model="isEditContentDialogOpen"
            :is-external-control="true"
            :edit-data="selectedContent"
            @confirm-create="handleContentSubmit"
            @cancel="handleEditContentCancel"
        />

        <confirmation-dialog
            v-model="isDeleteDialogOpen"
            :title="moduleToDelete ? 'Excluir Módulo' : 'Excluir Conteúdo'"
            :item-to-delete="moduleToDelete?.name || contentToDelete?.name"
            @confirm="handleDeleteConfirm"
            @cancel="handleDeleteCancel"
        />

        <v-expansion-panels
            v-model="expandedPanels"
            variant="accordion"
            elevation="0"
            class="text-body-2"
            multiple
        >
            <div v-if="!modules.length" class="text-weight-bold pa-1 py-3">carregando...</div>
            <v-expansion-panel
                v-for="(courseTabContent, index) in modules"
                v-else
                :key="courseTabContent.order"
                class="pa-0 rounded-0"
                hide-actions
                static
            >
                <template #title>
                    <div
                        class="d-flex justify-space-between align-center"
                        style="width: 100%"
                        @click="handleModuleSelect(courseTabContent)"
                    >
                        <v-btn
                            :icon="
                                isModuleExpanded(index) ? 'mdi-chevron-down' : 'mdi-chevron-right'
                            "
                            density="compact"
                            size="small"
                            variant="text"
                            @click.stop="handleWishToExpandModule(index)"
                        ></v-btn>

                        <div class="font-weight-medium" min-height="40">
                            Módulo {{ courseTabContent.order + ": " + courseTabContent.name }}
                        </div>

                        <div class="d-flex align-center">
                            <v-btn
                                icon="mdi-plus"
                                color="#6BFF50"
                                density="comfortable"
                                size="small"
                                variant="text"
                                class="mr-2"
                                @click.stop="handleAddContent(courseTabContent.id)"
                            />
                            <delete-and-edit-menu
                                :item="courseTabContent"
                                @delete="handleDeleteModule"
                                @edit="handleEditModule"
                            />
                        </div>
                    </div>
                </template>
                <template #text>
                    <div class="pa-0">
                        <div v-for="tabContent in courseTabContent.videos" :key="tabContent.id">
                            <v-divider v-if="tabContent.id > 1"></v-divider>
                            <v-card class="content-course">
                                <div class="d-flex flex-column ml-4 mt-1">
                                    <div class="font-weight-bold text-capitalize">
                                        {{ tabContent.name }}
                                    </div>
                                    <div class="d-flex align-center pa-0 h-100">
                                        <span
                                            class="mdi mdi-video-outline text-body-1 mr-1 pa-0"
                                        ></span>
                                        <div>
                                            {{ formatSecondsToHMS(tabContent.duration) }}
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex justify-end ga-3">
                                    <v-btn
                                        v-for="button in contentButtons"
                                        :key="button.icon"
                                        :icon="button.icon"
                                        :color="button.color"
                                        density="comfortable"
                                        size="small"
                                        variant="tonal"
                                        @click="button.action(tabContent, courseTabContent.id)"
                                    ></v-btn>
                                </div>
                            </v-card>
                        </div>
                    </div>
                </template>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from "vue";
import { formatSecondsToHMS } from "@/utils/DateUtils";
import type { TContentModule } from "@/modules/course/course.types";
import DeleteAndEditMenu from "@/components/menus/delete-and-edit-menu.vue";
import CreateAndEditModule from "./create-and-edit-module.vue";
import ConfirmationDialog from "@/components/dialogs/confirmation-dialog.vue";
import { AdminService } from "../admin.service";
import CreateAndEditContent from "./create-and-edit-content.vue";
import type { TContentVideoModule, TCreateContentData } from "../admin.types";

defineOptions({
    name: "ModuleContent",
});

const adminService = AdminService();

const emit = defineEmits(["update:modules"]);

defineProps({
    modules: {
        type: Array as PropType<TContentModule[]>,
        required: true,
    },
});

const expandedPanels = ref<number[]>([]);
const isEditModuleDialogOpen = ref(false);
const isEditContentDialogOpen = ref(false);
const selectedModule = ref<TContentModule | null>(null);
const selectedContent = ref<TContentVideoModule | null>(null);
const isDeleteDialogOpen = ref(false);
const moduleToDelete = ref<TContentModule | null>(null);
const contentToDelete = ref<TContentVideoModule | null>(null);
const isLoading = ref(false);

const contentButtons = ref([
    {
        icon: "mdi-pencil",
        color: "primary",
        action: (content: TContentVideoModule, moduleId: number) => {
            handleEditContent(content, moduleId);
        },
    },
    {
        icon: "mdi-delete",
        color: "red",
        action: (content: TContentVideoModule) => {
            handleDeleteContentClick(content);
        },
    },
]);

const handleEditModule = (module: TContentModule) => {
    selectedModule.value = module;
    isEditModuleDialogOpen.value = true;
};

const handleEditModuleConfirm = async (module: TContentModule) => {
    const response = await adminService.updateModuleService(module, module.id);

    if (response) {
        selectedModule.value = null;
        isEditModuleDialogOpen.value = false;
        emit("update:modules");
    }
};

const handleEditModuleCancel = () => {
    selectedModule.value = null;
    isEditModuleDialogOpen.value = false;
};

const handleDeleteModule = (module: TContentModule) => {
    moduleToDelete.value = module;
    isDeleteDialogOpen.value = true;
};

const handleDeleteContentClick = (content: TContentVideoModule) => {
    contentToDelete.value = content;
    isDeleteDialogOpen.value = true;
};

const handleDeleteContent = async (content: TContentVideoModule) => {
    if (!content.id) return;

    const response = await adminService.deleteContentService(content.id);

    if (response) {
        emit("update:modules");
    }
};

const handleDeleteConfirm = async () => {
    if (moduleToDelete.value) {
        const response = await adminService.deleteModuleService(moduleToDelete.value.id);

        if (response) {
            moduleToDelete.value = null;
            isDeleteDialogOpen.value = false;
            emit("update:modules");
        }
    } else if (contentToDelete.value) {
        await handleDeleteContent(contentToDelete.value);
        contentToDelete.value = null;
        isDeleteDialogOpen.value = false;
    }
};

const handleDeleteCancel = () => {
    moduleToDelete.value = null;
    contentToDelete.value = null;
    isDeleteDialogOpen.value = false;
};

const handleModuleSelect = (module: TContentModule) => {
    selectedModule.value = module;
};

const handleAddContent = (moduleId: number) => {
    selectedContent.value = null;
    isEditContentDialogOpen.value = true;
    selectedModule.value = { id: moduleId } as TContentModule;
};

const handleEditContent = (content: TContentVideoModule, moduleId: number) => {
    selectedContent.value = content;
    isEditContentDialogOpen.value = true;
    selectedModule.value = { id: moduleId } as TContentModule;
};

const handleContentSubmit = async (content: TContentVideoModule) => {
    if (selectedContent.value) {
        await handleEditContentConfirm(content);
    } else {
        await handleCreateContentConfirm(content);
    }
};

const handleEditContentConfirm = async (content: TContentVideoModule) => {
    if (!content.id) return;

    const createContentData: TCreateContentData = {
        name: content.name,
        description: content.description,
        video: content.video || null,
        id: content.id,
    };

    const response = await adminService.updateContentService(createContentData, content.id);

    if (response) {
        selectedContent.value = null;
        isEditContentDialogOpen.value = false;
        emit("update:modules");
    }
};

const handleEditContentCancel = () => {
    selectedContent.value = null;
    isEditContentDialogOpen.value = false;
    selectedModule.value = null;
};

const handleCreateContentConfirm = async (content: TContentVideoModule) => {
    if (!selectedModule.value?.id) return;

    const createContentData: TCreateContentData = {
        name: content.name,
        description: content.description,
        video: content.video || null,
    };

    const response = await adminService.createContentService(
        createContentData,
        selectedModule.value.id,
    );

    if (response) {
        selectedContent.value = null;
        isEditContentDialogOpen.value = false;
        selectedModule.value = null;
        emit("update:modules");
    }
};

const handleWishToExpandModule = (index: number) => {
    const currentIndex = expandedPanels.value.indexOf(index);
    if (currentIndex === -1) {
        expandedPanels.value.push(index);
    } else {
        expandedPanels.value.splice(currentIndex, 1);
    }
};

const isModuleExpanded = (index: number) => {
    return expandedPanels.value.includes(index);
};
</script>

<style scoped>
.content-course {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    align-items: center;
    box-shadow: none;
    cursor: pointer;
    border-radius: 0;
}

:deep(.v-expansion-panel-title.v-expansion-panel-title--static) {
    padding: 10px;
}

:deep(.v-expansion-panel-text__wrapper) {
    padding: 0px;
}
</style>

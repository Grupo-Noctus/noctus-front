import { ref } from "vue";

import { defineStore } from "pinia";

export const useAdminStore = defineStore("admin", () => {
    const loadingModulesAndContents = ref(false);

    return {
        loadingModulesAndContents,
    };
});

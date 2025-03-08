import { computed, ref } from "vue";
import { ptBR } from "date-fns/locale";
import { defineStore } from "pinia";

import useDateandLocale from "../utils/DateUtils";

export const useDateStore = defineStore("dateStore", () => {
    const today = ref(new Date());
    const locale = ref(ptBR);

    const { formattedDate, formattedDateMM } = useDateandLocale();

    const updateDate = () => {
        today.value = new Date();
    };

    return {
        today,
        locale,
        formattedDate: computed(() => formattedDate.value),
        formattedDateMM: computed(() => formattedDateMM.value),
        updateDate,
    };
});

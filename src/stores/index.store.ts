import { computed, ref } from "vue";
import { ptBR } from "date-fns/locale";
import { defineStore } from "pinia";

import useDateandLocale from "../utils/DateUtils";
import { useTheme } from "vuetify";

export const useIndexStore = defineStore("dateStore", () => {
    const today = ref(new Date());
    const locale = ref(ptBR);
    const isDark = ref(false);
    const currentTheme = ref("light");
    const { formattedDate, formattedDateMM } = useDateandLocale();

    const theme = useTheme();

    const updateDate = () => {
        today.value = new Date();
    };

    const changeTheme = () => {
        currentTheme.value = localStorage.getItem("theme") || "light";

        currentTheme.value = isDark.value ? "light" : "dark";

        isDark.value = currentTheme.value === "dark" ? true : false;

        theme.global.name.value = currentTheme.value;

        localStorage.setItem("theme", currentTheme.value);
    };

    return {
        today,
        locale,
        currentTheme,
        isDark,
        formattedDate: computed(() => formattedDate.value),
        formattedDateMM: computed(() => formattedDateMM.value),
        updateDate,
        changeTheme,
    };
});

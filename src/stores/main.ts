import { defineStore } from 'pinia';
import { format, formatDate } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import useDateandLocale from "../utils/DateUtils"


export const useDateStore = defineStore('dateStore', {
    state: () => ({
        today: new Date(),
        locale: ptBR
    }),

    getters: {
        formattedDate: () => useDateandLocale().formattedDate.value,
        formattedDateMM: () => useDateandLocale().formattedDateMM.value
    },

    actions: {
        updateDate() {
            this.today = new Date(); // Atualiza a data
          }
    }
})
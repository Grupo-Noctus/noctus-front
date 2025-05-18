import { format, addSeconds } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ref, computed } from "vue";

const selectedLocale = ref(ptBR);

const useDateandLocale = () => {
    const formattedDate = computed(() => {
        return format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: selectedLocale.value });
    });

    const formattedDateMM = computed(() => {
        return format(new Date(), "dd'/'MM'/'yyyy", { locale: selectedLocale.value });
    });

    return { formattedDate, formattedDateMM };
};

export function formatSecondsToHMS(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const pad = (num: number) => String(num).padStart(2, "0");

    return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
}

export default useDateandLocale;

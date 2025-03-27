import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ref, computed } from 'vue';

const selectedLocale = ref(ptBR)

const useDateandLocale = () => {

    const formattedDate = computed(() => {
        return format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: selectedLocale.value })
        });


    const formattedDateMM = computed(() => {
        return format(new Date(), "dd'/'MM'/'yyyy", { locale: selectedLocale.value })
        });

    return { formattedDate, formattedDateMM }

}



export default useDateandLocale



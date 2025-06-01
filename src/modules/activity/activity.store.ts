import { defineStore } from "pinia";
import { ref } from 'vue'

export const userEvaluationStore = defineStore('evaluation', () => {
    const correctAnswers = ref(0);

    function setCorrectAnswers(value: number) {
        correctAnswers.value = value
    }

    return { correctAnswers, setCorrectAnswers }
})
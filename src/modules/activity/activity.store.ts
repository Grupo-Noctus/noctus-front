import { defineStore } from "pinia";
import { ref, watch } from 'vue'

export type TcourseExam = {
    courseId: number;
    rightAnswers: number;
};

export const userEvaluationStore = defineStore('evaluation', () => {
    const courseExams = ref<TcourseExam[]>([]);
    const correctAnswers = ref(0);

    function setIntoCourseExams(param: TcourseExam) {
        const result = courseExams.value?.filter((e) => {
            return e.courseId === param.courseId
        })
        if (result.length) {
            return;
        }
        return courseExams.value.push(param)
    }

    function setCorrectAnswers(value: number) {
        correctAnswers.value = value
    }

    function getCourseExam(courseId: number) {
        const result = courseExams.value.find(e => e.courseId === courseId)
        return result;
    }

    return { courseExams, setIntoCourseExams, setCorrectAnswers, getCourseExam, correctAnswers }
})
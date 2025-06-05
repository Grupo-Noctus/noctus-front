<template>
  <div class="evaluation-container" color="secondary">
    <v-card class="card" color="secondary">
      <v-progress-linear v-model="power" class="progress-bar" color="accent" height="10"></v-progress-linear>
      <div>
        <v-card-title class="question-card" color="warning">
          {{ programmingEvaluation.exam.questions[idQuestion].questionText }}
        </v-card-title>
        <v-card-subtitle class="subtitle">
          Selecione uma alternativa:
        </v-card-subtitle>
      </div>

      <div v-if="programmingEvaluation.exam.questions[idQuestion]" class="answers-container">
        <v-card v-for="(options, index) in programmingEvaluation.exam.questions[idQuestion].options" :key="index"
          class="answer-card" :class="{ 'selected-answer': selectedAnswer === index }" outlined variant="tonal"
          @click="selectAnswer(index)">
          {{ options.optionText }}
        </v-card>
      </div>

      <div class="navigation-buttons">
        <v-btn v-if="showPreviousQuestion" color="primary" @click="previousQuestion">
          <v-icon icon="mdi-chevron-left"></v-icon>
          Anterior
        </v-btn>
        <v-btn v-if="showNextQuestion" color="primary" @click="nextQuestion">
          Próximo
          <v-icon icon="mdi-chevron-right"></v-icon>
        </v-btn>
        <div>
          <ActivityAlert v-if="finish" v-model="dialog" :dialog="false" @response="handleResponse" />
        </div>

      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import router from "@/plugins/router/router";
import { programmingEvaluation } from '../data/activity-form-data'
import ActivityAlert from '@/modules/activity/dialog/activity-alert.vue'
import { userEvaluationStore } from '../activity.store';
import { pushMessageNotification } from "@/utils/notivue-base";
pushMessageNotification;

const power = ref(10)
const idQuestion = ref(0);
const dialog = ref(false)
const selectedAnswer = ref<number | null>(null);
const showPreviousQuestion = computed(() => idQuestion.value > 0)
const showNextQuestion = computed(() => idQuestion.value < programmingEvaluation.exam.questions.length - 1)
const finish = computed(() => idQuestion.value === programmingEvaluation.exam.questions.length - 1)
let userAnswers = ref<(number | null)[]>([]);
userAnswers.value = Array(programmingEvaluation.exam.questions.length).fill(null)
let correctAnswers = ref<typeof programmingEvaluation.exam.questions>([]);
correctAnswers.value = Array(programmingEvaluation.exam.questions.length).fill(null)
const evaluationStore = userEvaluationStore();

function selectAnswer(index: number) {
  selectedAnswer.value = index;
  userAnswers.value[idQuestion.value] = index;
  correctAnswers.value = programmingEvaluation.exam.questions.filter(
    (questions, index) => {
      const userAnswerIndex = userAnswers.value[index];
      return userAnswerIndex !== null && questions.options[userAnswerIndex]?.correct;
    }
  );
}

function updateProgress() {
  const total = programmingEvaluation.exam.questions.length;
  power.value = ((idQuestion.value + 1) / total) * 100;
}

function previousQuestion() {
  if (idQuestion.value > 0) {
    idQuestion.value--;
    selectedAnswer.value = userAnswers.value[idQuestion.value]
  }
  updateProgress()
}

function nextQuestion() {
  if (idQuestion.value < programmingEvaluation.exam.questions.length - 1) {
    idQuestion.value++;
    selectedAnswer.value = userAnswers.value[idQuestion.value];
  }
  updateProgress()
}

function handleResponse(value: 'sim' | 'nao') {

  if (value === 'sim') {
    evaluationStore.setCorrectAnswers(correctAnswers.value.length)
    router.push({ name: "ActivityCompleted" })
  }
}

</script>

<style scoped>
.evaluation-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow-y: auto;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  height: 600px;
  width: 700px;
  padding: 30px;
  margin: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.progress-bar {
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  display: block;
}

.question-card {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  width: 600px;
  height: auto;
  font-size: 20px;
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: normal;
}

.subtitle {
  margin-top: 12px;
  /* mt-3 */
  margin-bottom: 4px;
  /* mb-1 */
  display: flex;
  justify-content: flex-start;
}

.answers-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 10px;
  width: 600px;
}

.answer-card {
  padding: 12px;
  /* pa-3 */
  cursor: pointer;
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: normal;
}

.selected-answer {
  background-color: #482E8F !important;
  color: white;
}

.navigation-buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 12px;
  margin-top: 20px;
  margin-bottom: 50px;
}

::v-deep(.navigation-buttons .v-btn:hover) {
  background-color: #482E8F;
}

@media (max-width: 768px) {

  .evaluation-container {
    height: 100vh;
  }

  .card {
    width: 100%;
    height: 100vh;
    padding: 10px;
    margin: 0;
    border: none !important;
  }

  .question-card,
  .answers-container,
  .subtitle {
    width: 100%;
    max-width: 600px;
  }

  .question-card {
    font-size: 18px;
    margin-top: 4px;
    margin-bottom: 4px;
  }

  .subtitle {
    margin-top: 2px;
    margin-bottom: 2px;
  }

  .answers-container {
    margin-top: 4px;
  }

  .navigation-buttons {
    margin-top: 100px;
    margin-bottom: 100px;
  }
}

@media (max-width: 480px) {
  .question-card {
    font-size: 16px;
    margin-top: 2px;
    margin-bottom: 20px;
  }

  .navigation-buttons {
    margin-top: 100px;
    margin-bottom: 100px;
  }
}
</style>
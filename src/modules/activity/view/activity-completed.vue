<template>
  <div class="completion-container h-100" color="secondary">
    <v-card class="card pa-5" color="secondary">
      <v-card-title class="title">
        Você concluiu a avaliação!
      </v-card-title>

      <v-card-title>
        Acertos {{ correctAnswers }} / {{ questions.length }}
      </v-card-title>

      <v-card-subtitle class="subtitle">
        Parabéns por finalizar mais uma etapa! Sua dedicação ao aprendizado é fundamental. Veja o que preparamos para
        você continuar avançando:
      </v-card-subtitle>
      <div class="card-modules-wrapper">

        <v-card class="card-module" @click="acessCertificatePage">
          <v-card-title class="card-module-title">
            <span class="mdi mdi-certificate-outline"></span>
            certificado
          </v-card-title>
          <v-card-subtitle class="card-module-subtitle">Clique aqui para gerar o certificado</v-card-subtitle>
        </v-card>

        <v-card class="card-module" @click="returnCoursePage">
          <v-card-title class="card-module-title">
            <span class="mdi mdi-book-education"></span>
            Curso
          </v-card-title>
          <v-card-subtitle class="card-module-subtitle">Clique aqui para retornar para o curso</v-card-subtitle>
        </v-card>

        <v-card class="card-module" @click="acessDetailsCoursePage">
          <v-card-title class="card-module-title">
            <span class="mdi mdi-book-information-variant"></span>
            detalhes
          </v-card-title>
          <v-card-subtitle class="card-module-subtitle">Clique aqui para visualizar os detalhes do
            curso</v-card-subtitle>
        </v-card>

      </div>

      <v-btn class="return-button" @click="returnStudentPage">
        Retornar para a tela inicial
      </v-btn>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from "vue-router";
import { userEvaluationStore } from '../activity.store';
import { useCourseSecondStore } from '@/modules/course/course-second.store';

const route = useRoute();
const router = useRouter();
const evaluationStore = userEvaluationStore();
const correctAnswers = evaluationStore.correctAnswers
const courseSecondStore = useCourseSecondStore();
const questions = computed(() => courseSecondStore.exams[0].questions)

const returnStudentPage = () => {
  router.replace({ name: "Student" });
};

const returnCoursePage = () => {
  const CourseId = route.params.courseId
  router.replace({ name: "CourseDetail", params: { id: CourseId } });
};

const acessCertificatePage = () => {
  /*const CourseId = route.params.courseId
  router.replace({ name: "", params: { id: CourseId } });*/
  alert("EM ANDAMENTO");
};

const acessDetailsCoursePage = () => {
  /*const CourseId = route.params.courseId
  router.replace({ name: "", params: { id: CourseId } });*/
  alert("EM ANDAMENTO");
};

</script>

<style scoped>
/* Container principal */
.completion-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0;
}

/* Card */
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
  height: 600px;
  width: 700px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

/* Título */
.title {
  margin-top: 32px;
  /* mt-8 */
  font-size: 2rem;
  text-align: center;
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: normal;
}

/* Subtítulo */
.subtitle {
  margin-top: 12px;
  /* mt-3 */
  text-align: center;
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: normal;
  font-size: 17px;
}

/* Botão */
.return-button {
  padding: 8px;
  /* pa-2 */
  margin-top: 20px;
  /* mt-5 */
  background-color: #482E8F;
  color: #FFFFFF;
}

.return-button:hover {
  background-color: #331d6e;

}

.card-module {
  width: 200px;
  height: 150px;
  display: block;
  flex-direction: column;
  gap: 0;
  border: 2px solid transparent;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  align-items: center;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  background-color: #461CDC;
  color: #FFFFFF;
}

.card-module:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  border-color: #6FF24B;
}

.card-module .mdi {
  font-size: 24px;
  /* Aumenta o tamanho do ícone */
  /* (Opcional) Espaço entre o ícone e o texto */
}

.card-module-title {
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: normal;
  text-transform: uppercase;
}

.card-module-subtitle {
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: normal;
}

.card-modules-wrapper {
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin: 50px;
}

@media (max-width: 768px) {
  .completion-container {
    padding: 1rem;
    min-height: 100vh;
  }

  .card {
    width: 100%;
    max-width: none;
    padding: 1.5rem;
    margin: 0;
    min-height: auto;
    height: auto;
  }

  .title {
    font-size: 1.5rem;
    margin-top: 0;
  }

  .subtitle {
    font-size: 1rem;
  }

  .card-modules-wrapper {
    flex-direction: column;
    gap: 1rem;
    margin: 1.5rem 0;
  }

  .card-module {
    width: 100%;
    max-width: 300px;
    height: 120px;
  }
}

/* Mobile - 480px e abaixo */
@media (max-width: 480px) {
  .completion-container {
    padding: 0.5rem;
  }

  .card {
    padding: 1rem;
    border-radius: 8px;
  }

  .title {
    font-size: 1.3rem;
  }

  .subtitle {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }

  .card-modules-wrapper {
    gap: 0.8rem;
    margin: 1rem 0;
  }

  .card-module {
    width: 100%;
    max-width: none;
    height: 100px;
    padding: 0.8rem;
  }

  .card-module .mdi {
    font-size: 1.5rem;
  }

  .card-module-title {
    font-size: 0.9rem;
  }

  .card-module-subtitle {
    font-size: 0.8rem;
  }

  .return-button {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
    width: 100%;
    max-width: 300px;
  }
}

/* Extra small - 320px e abaixo */
@media (max-width: 320px) {
  .completion-container {
    padding: 0.25rem;
  }

  .card {
    padding: 0.8rem;
  }

  .title {
    font-size: 1.1rem;
  }

  .subtitle {
    font-size: 0.85rem;
  }

  .card-module {
    height: 90px;
    padding: 0.6rem;
  }

  .card-module .mdi {
    font-size: 1.2rem;
  }

  .card-module-title {
    font-size: 0.8rem;
  }

  .card-module-subtitle {
    font-size: 0.75rem;
  }
}

</style>

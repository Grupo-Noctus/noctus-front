<template>
  <div class="completion-container h-100" color="secondary">
    <v-card class="card pa-5" color="secondary">
      <v-card-title class="title">
        {{ courseData.completed === 1 ? 'Você concluiu o Curso!' : 'Curso em Andamento' }}
      </v-card-title>

      <v-card-subtitle class="subtitle">
        {{ courseData.completed === 1
          ? 'Sua dedicação ao aprendizado foi essencial para chegar até aqui. Agora, é com grande satisfação que apresentamos o seu certificado, reconhecimento oficial do seu esforço e progresso. Que ele seja um marco na sua jornada e inspire você a continuar evoluindo!'
          : 'Você ainda está em progresso no curso. Continue se dedicando e retorne quando concluir para receber seu certificado!' }}
      </v-card-subtitle>
      <div class="card-modules-wrapper" v-if="courseData.completed === 1">
        <v-card class="card-module" @click="acessCertificatePage">
          <v-card-title class="card-module-title">
            <span class="mdi mdi-certificate-outline"></span>
            certificado
          </v-card-title>
          <v-card-subtitle class="card-module-subtitle">Clique aqui para gerar o certificado</v-card-subtitle>
        </v-card>
      </div>

      <v-btn class="return-button" @click="returnStudentPage">
        Retornar para a tela inicial
      </v-btn>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import router from "@/plugins/router/router";
import { useRoute } from "vue-router";


const courseData = {
  idEnroll: 1,
  completed: 0,
  expiredAt: "2025-06-03T13:47:45Z",
  idCourse: 1,
  nameCourse: "Lengo tengo",
  courseDescription: "Lengo tengo lengo tengo",
  courseImage: "/images-courses/1/faqohehvaywjaiijf-58968002-0dc5-488b-a23e-7510eaee0c6.jpeg",
  modules: [
    { id: 1, name: "kfold5fd", description: "5fd5fd", order: 1 },
    { id: 2, name: "terter", description: "terterter", order: 2 }
  ],
  videos: []
};

const route = useRoute();

const returnStudentPage = () => {
  router.replace({ name: "Student" });
};

const returnCoursePage = () => {
  const courseId = route.params.courseId;
  router.replace({ name: "CourseDetail", params: { id: courseId } });
};

const acessCertificatePage = () => {
  if (courseData.completed === 1) {
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }
      confetti({
        particleCount: 190,
        spread: 70,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2
        }
      });
    }, 250);
  } else {
    alert("Você ainda não concluiu o curso. Finalize-o para gerar o certificado!");
  }
};
</script>

<style scoped>

.completion-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
  height: 600px;
  width: 700px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}


.title {
  margin-top: 32px;

  font-size: 2rem;
  text-align: center;
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: normal;
}


.subtitle {
  margin-top: 12px;
  text-align: center;
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: normal;
  font-size: 17px;
}


.return-button {
  padding: 8px;
  margin-top: 20px;
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
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
  border-color: #6FF24B;
}

.card-module .mdi {
  font-size: 24px;

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

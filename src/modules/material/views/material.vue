<template>
  <div class="pa-0 ma-4">

    <div class="text-h6 text-center" variant="text">Arquivos do curso</div>


    <div v-if="!courseFiles" class="loading-container text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
      <p>Carregando arquivos...</p>
    </div>


    <v-row class="mt-4" no-gutters v-else>
      <v-col
        v-for="(file, index) in courseFiles"
        :key="index"
        cols="12"
        md="4"
        class="my-2"
      >
        <v-card
          color="primary"
          class="mx-auto"
          max-width="300"
          height="300"
          @click="downloadFile(file.fileName)"
        >
          <v-sheet color="primary" height="200px" width="100%" class="d-flex justify-center align-center">
            <v-icon color="white" size="200">mdi-folder</v-icon>
          </v-sheet>
          <div class="d-flex flex-column justify-center align-center pa-4" style="color: white;">
            <v-card-title>{{ file.name }}</v-card-title>
            <v-card-subtitle>{{ file.type }}</v-card-subtitle>
            <v-btn class="mt-4" color="white" outlined @click.stop="downloadFile(file.fileName)">
              Fazer Download
            </v-btn>
          </div>
        </v-card>
      </v-col>


      <div v-if="courseFiles.length === 0" class="error-container text-center" >
        <v-icon color="red" size="50">mdi-alert-circle</v-icon>
        <p class="text-h6 mt-2">Desculpe, não há arquivos disponíveis para este curso no momento.</p>
      </div>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import router from "@/plugins/router/router";


const courseFiles = ref<any[]>([]);


const route = useRoute();

const fetchCourseFiles = async () => {
  try {
    const I = route.params.courseId;
    const response = await fetch(`http://localhost:3000/material/find-many/4`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",

      }
    });
    if (!response.ok) throw new Error("Erro ao buscar arquivos do curso");
    const data = await response.json();
    courseFiles.value = data.files || [];
  } catch (error) {
    console.error("Erro na chamada à API:", error);
    courseFiles.value = [];
  }
};


onMounted(() => {
  fetchCourseFiles();
});

const downloadFile = (fileName: string) => {
  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>

<style scoped>
.loading-container {
  margin-top: 2rem;
}

.loading-container p {
  margin-top: 1rem;
  font-size: 1.1rem;
}

.error-container {
  margin-top: 2rem;
  padding: 2rem;
  background-color: #ffebee;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.error-container p {
  color: #d32f2f;
}
</style>

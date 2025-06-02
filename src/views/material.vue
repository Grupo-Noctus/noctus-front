<template>
  <div class="d-flex pa-0 ma-0" style="height: 100vh;">
    <v-row class="mt-8" no-gutters>
      <!-- Adicionando o título "Materiais do Curso" -->
      <v-col cols="12" class="text-center mb-4">
        <h1 style="color: #333; font-size: 2rem;">Materiais do Curso</h1>
      </v-col>
      <v-col cols="12" md="4" class="my-2">
        <v-card
          color="primary"
          class="mx-auto"
          max-width="300"
          height="300"
          @click="downloadFile('Arquivo1.pdf')"
        >
          <v-sheet color="primary" height="200px" width="100%" class="d-flex justify-center align-center">
            <v-icon color="white" size="200">mdi-folder</v-icon>
          </v-sheet>

          <div class="d-flex flex-column justify-center align-center pa-4" style="color: white;">
            <v-card-title>
              Arquivo 1
            </v-card-title>

            <v-card-subtitle>
              PDF
            </v-card-subtitle>

            <v-btn class="mt-4" color="white" outlined @click.stop>Fazer Download</v-btn>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" class="my-2">
        <v-card
          color="primary"
          class="mx-auto"
          max-width="300"
          height="300"
          @click="downloadFile('Arquivo2.pdf')"
        >
          <v-sheet color="primary" height="200px" width="100%" class="d-flex justify-center align-center">
            <v-icon color="white" size="200">mdi-folder</v-icon>
          </v-sheet>

          <div class="d-flex flex-column justify-center align-center pa-4" style="color: white;">
            <v-card-title>
              Arquivo 2
            </v-card-title>

            <v-card-subtitle>
              PDF
            </v-card-subtitle>

            <v-btn class="mt-4" color="white" outlined @click.stop>Fazer Download</v-btn>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" class="my-2">
        <v-card
          color="primary"
          class="mx-auto"
          max-width="300"
          height="300"
          @click="downloadFile('Arquivo3.pdf')"
        >
          <v-sheet color="primary" height="200px" width="100%" class="d-flex justify-center align-center">
            <v-icon color="white" size="200">mdi-folder</v-icon>
          </v-sheet>

          <div class="d-flex flex-column justify-center align-center pa-4" style="color: white;">
            <v-card-title>
              Arquivo 3
            </v-card-title>

            <v-card-subtitle>
              PDF
            </v-card-subtitle>

            <v-btn class="mt-4" color="white" outlined @click.stop>Fazer Download</v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
const downloadFile = (fileName: string) => {
  const fileUrl = `https://example.com/files/${fileName}`;
  const link = document.createElement('a');
  link.href = fileUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>

<style>
.v-card {
  border-radius: 10px;
  box-shadow: none;
  cursor: pointer;
}
.v-card:hover {
  opacity: 0.9;
}

@media (max-width: 960px) {
  .my-2 {
    margin-top: 8px !important;
    margin-bottom: 8px !important;
  }
}
</style>

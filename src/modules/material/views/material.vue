<template>
  <div class="pa-0 ma-4">
    <div class="text-h6 text-center" variant="text">Arquivos do curso</div>

    <v-row class="mt-4" no-gutters>
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
    </v-row>
  </div>
</template>

<script setup lang="ts">
const courseFiles = [
  {
    name: 'Arquivo 1',
    type: 'PDF',
    fileName: 'Arquivo1.pdf',
  },
  {
    name: 'Arquivo 2',
    type: 'PDF',
    fileName: 'Arquivo2.pdf',
  },
  {
    name: 'Arquivo 3',
    type: 'PDF',
    fileName: 'Arquivo3.pdf',
  },
];

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

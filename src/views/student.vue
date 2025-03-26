<template>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h1 class="text-h4 mb-4 text-center">Meus Cursos</h1>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-card
            v-for="course in courses"
            :key="course.id"
            class="course-card mb-4 mx-auto"
            elevation="2"
            :class="{ 'dark-theme': isDark }"
            max-width="500"
          >
            <v-row no-gutters align="center">

              <v-col cols="12" sm="4">
                <v-img
                  :src="course.image"
                  height="150"
                  cover
                  class="course-image"
                >
                  <v-chip
                    v-if="isExpired(course.expirationDate)"
                    color="error"
                    class="ma-3"
                    size="large"
                    label
                    outlined
                    style="font-weight: bold;"
                  >
                    EXPIRADO
                  </v-chip>
                </v-img>
              </v-col>


              <v-col cols="12" sm="8" class="pa-4">
                <v-card-title class="text-h5">
                  {{ course.name }}
                </v-card-title>

                <v-card-subtitle class="mt-2">
                  Expira em: {{ formatDate(course.expirationDate) }}
                </v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    color="warning"
                    variant="text"
                    size="large"
                    @click="viewCourse(course.id)"
                  >
                    Acessar Curso
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>

  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useIndexStore } from '@/stores/index.store';
  import { useRouter } from 'vue-router';

  interface Course {
    id: number;
    name: string;
    expirationDate: string;
    image: string;
  }

  const router = useRouter();
  const indexStore = useIndexStore();

  const courses = ref<Course[]>([
    {
      id: 1,
      name: 'UX/UI Designer',
      expirationDate: '2025-06-30',
      image: 'src/layout/curso-de-ux-design-2.jpg',
    },
    {
      id: 2,
      name: 'Java Avançado',
      expirationDate: '2025-03-15',
      image: 'src/layout/java-thumb-1024x576.png',
    },
    {
      id: 3,
      name: 'Introdução ao Docker',
      expirationDate: '2025-09-20',
      image: 'src/layout/maxresdefault.jpg',
    },
  ]);

  const isDark = computed(() => indexStore.isDark);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const isExpired = (dateString: string): boolean => {
    return new Date(dateString) < new Date();
  };

  const viewCourse = (courseId: number) => {
    router.push(`/course/${courseId}`);
  };
  </script>

  <style scoped>
  .course-card {
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .course-image {
    position: relative;
  }

  .v-card-title {
    word-break: break-word;
    line-height: 1.2;
  }

  .dark-theme {
    background-color: #2e323f;
    color: #fff;
  }


  @media (max-width: 600px) {
    .course-card {
      flex-direction: column; 
    }
  }
  </style>


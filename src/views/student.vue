<template>

    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h1 class="text-h4 mb-4 text-center">Meus Cursos</h1>
        </v-col>
      </v-row>

      <v-row justify="center" align="center">
        <v-col
          v-for="course in courses"
          :key="course.id"
          cols="auto"
          sm="6"
          md="4"
          lg="4"
          class="pa-4"
        >


          <v-card
            class="course-card pa-4 mx-auto "
            elevation="4"
            :class="{ 'dark-theme': isDark }"
          >
            <v-img
              :src="course.image"
              height="200"
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

            <v-card-title class="text-h5 mt-3">
              {{ course.name }}
            </v-card-title>

            <v-card-subtitle class="mb-3 text-body-2">
              Expira em: {{ formatDate(course.expirationDate) }}
            </v-card-subtitle>

            <v-card-text class="text-body-1">
              {{ course.description }}
            </v-card-text>

            <v-card-actions>
              <v-btn
                color="warning"
                variant="tonal"
                size="large"
                block
                @click="viewCourse(course.id)"
              >
                Acessar Curso
              </v-btn>
            </v-card-actions>
          </v-card>


        </v-col>
      </v-row>
      <v-btn @click="customNotification">progress</v-btn>
    </v-container>
  </template>

  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useIndexStore } from '@/stores/index.store';
  import { useRouter } from 'vue-router';
  import { pushMessageNotification } from "@/utils/notivue-base";
  pushMessageNotification;

  const customNotification = () => {
      pushMessageNotification({
          type: "success",
          title: "title",
          message: "message",
          props: {
              progress: true,
          },
          duration: 3000,
      });
  };

  interface Course {
    id: number;
    name: string;
    expirationDate: string;
    image: string;
    description: string;
  }

  const router = useRouter();
  const indexStore = useIndexStore();

  const courses = ref<Course[]>([
    {
      id: 1,
      name: 'UX/UI Designer',
      expirationDate: '2025-06-30',
      image: 'src/layout/curso-de-ux-design-2.jpg',
      description: 'Aprenda a criar interfaces intuitivas e designs incríveis.',
    },
    {
      id: 2,
      name: 'Java Avançado',
      expirationDate: '2025-03-15',
      image: 'src/layout/java-thumb-1024x576.png',
      description: 'Domine conceitos avançados de programação em Java.',
    },
    {
      id: 3,
      name: 'Introdução ao Docker',
      expirationDate: '2025-09-20',
      image: 'src/layout/maxresdefault.jpg',
      description: 'Conheça os fundamentos de contêineres com Docker.',
    },
    {
      id: 4,
      name: 'C# para iniciantes ',
      expirationDate: '2025-08-12',
      image: 'src/layout/cfoto.jpeg',
      description: 'Crie aplicações web modernas com React.',
    },
    {
      id: 5,
      name: 'Usando Vuetify',
      expirationDate: '2025-07-05',
      image: 'src/layout/vuetify.jpeg',
      description: 'Desenvolva interfaces elegantes com Vuetify.',
    },
    {
      id: 6,
      name: 'Python Básico',
      expirationDate: '2025-10-22',
      image: 'src/layout/phynton.jpeg',
      description: 'Mergulhe nas práticas de DevOps e automação.',
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
    max-width: 400px;
    display: flex;
    flex-direction: column;
    border-radius: 12px;
  }

  .course-image {
    position: relative;
    border-radius: 8px;
  }

  .v-card-title {
    word-break: break-word;
    line-height: 1.4;
  }

  .v-card-text {
    flex-grow: 1;
  }

  .dark-theme {
    background-color: #2e323f;
    color: #fff;
  }


  .mx-auto {
    margin-left: auto;
    margin-right: auto;
  }
  </style>
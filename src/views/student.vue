<template>

    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h1 class="text-h4 mb-4 text-center">Meus Cursos</h1>
        </v-col>
      </v-row>

      <v-row justify="center" align="center">

        <v-col v-if="!courses" cols="12" class="text-center">
          <v-alert type="info">Nenhum curso encontrado.</v-alert>
        </v-col>

        <v-col
          v-for="course in courses"
          v-else
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
            <v-img v-if="!course.image"
              src="https://placehold.co/300x200"
              height="200"
              cover
              class="course-image"
            >
              <v-chip
                v-if="isExpired(course.endDate)"
                color="error"
                class="ma-3"
                size="large"
                label
                
                style="font-weight: bold;"
              >
                EXPIRADO
              </v-chip>
            </v-img>

            <v-img v-else
              :src="course.image"
              height="200"
              cover
              class="course-image"
            >
              <v-chip
                v-if="isExpired(course.endDate)"
                color="error"
                class="ma-3 text-uppercase"
                size="large"
                label
                style="font-weight: bold;"
              >
                expirado
              </v-chip>
            </v-img>

            <v-card-title class="text-h5 mt-3">
              {{ course.name }}
            </v-card-title>

            <v-card-subtitle class="mb-3 text-body-2">
              Expira em: {{ formatDate(course.endDate) }}
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
    </v-container>
  </template>

  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useIndexStore } from '@/stores/index.store';
  import { useRouter } from 'vue-router';
  import { pushMessageNotification } from "@/utils/notivue-base";
  pushMessageNotification;
  import { CourseService } from '@/modules/course/course.service';
  

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

  const courses = ref<Course[]>([]);
  const { getCourseService } = CourseService();

  const fetchCourses = async () => {
  try {
    const response = await getCourseService();
    console.log('Resposta da API:', response);
    courses.value = response.courses;
  } catch (error) {
    console.error('Erro ao carregar cursos:', error);
  }
  };

  onMounted(() => {
    fetchCourses();
  });


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
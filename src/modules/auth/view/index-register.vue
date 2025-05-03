<template>
    <Register
      v-model:formData="formData" 
      redirectRouteName="Login"
      :onSubmit="submitForm"
       
    />
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import Register from './components/register/register-student.vue';
  import * as yup from 'yup';
  import router from "@/plugins/router/router";
  import { useAuthStore } from "@/stores/auth.store.ts";
  import { authHttp } from '@/plugins/api/http-instances';
  
  const formData = ref({
  name: '',
  userName: '',
  email: '',
  password: '',
  confirmationPassword: '',
  dateBirth: '',
  state: '',
  ethnicity: '',
  gender: '',
  educationLevel: '',
  hasDisability: '',
  disabilityType: '',
  needsSupportResources: '',
  supportResourcesDescription: '',
})
  
  const authStore = useAuthStore()

  const emailSchema = yup
  .string()
  .email('Formato de e-mail inválido')
  .required("O e-mail é obrigatório");

  const passwordSchema = yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("A senha é obrigatória");

  const confirmationPasswordSchema = yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("A senha é obrigatória");

  const submitForm = async () => {
    try {

      if (formData.value.password !== formData.value.confirmationPassword) {
        throw new Error("As senhas devem ser iguais");
    }
    
      await emailSchema.validate(formData.value.email);
      await passwordSchema.validate(formData.value.password);
      await confirmationPasswordSchema.validate(formData.value.confirmationPassword);

      authStore.setAuth({
        email: formData.value.email,
        password: formData.value.password
      })

      console.log("Dados a serem enviados:", formData.value);  // Verifique aqui


      const response = await authHttp.registerHttp({
        name: formData.value.name,
        userName: formData.value.userName,
        email: formData.value.email,
        password: formData.value.password,
        dateBirth: formData.value.dateBirth,
        state: formData.value.state,
        ethnicity: formData.value.ethnicity,
        gender: formData.value.gender,
        educationLevel: formData.value.educationLevel,
        hasDisability: formData.value.hasDisability,
        disabilityType: formData.value.disabilityType,
        needsSupportResources: formData.value.needsSupportResources,
        supportResourcesDescription: formData.value.supportResourcesDescription,
        image: null
      })
      console.log(response);
      //router.push({ name: 'Student' });

    } catch (error) {
      if (error instanceof yup.ValidationError) {
        alert(`${error.message}`);
      } else {
        console.error("Erro inesperado:", error);
      }
    }
  };
  
  </script>
  
  <style scoped>
  
  </style>
<template>
    <Login
      v-model:email="email"
      v-model:password="password" 
      redirectRouteName="Register"
      :onSubmit="submitForm"
       
    />
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import Login from './components/login.vue';
  import * as yup from 'yup';
  import router from "@/plugins/router/router";
  import { useAuthStore } from "@/stores/auth.store.ts";
  import { authHttp } from '@/plugins/api/http-instances';
  
  const email = ref('');
  const password = ref('');

  const authStore = useAuthStore()

  const emailSchema = yup
  .string()
  .email('Formato de e-mail inválido')
  .required("O e-mail é obrigatório");

  const passwordSchema = yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("A senha é obrigatória");

  const submitForm = async () => {
    try {
      await emailSchema.validate(email.value);
      await passwordSchema.validate(password.value);
      authStore.setAuth({
        email: email.value,
        password: password.value
      })
      
      try{
      const response = await authHttp.loginHttp(email.value, password.value)
      router.push({ name: 'Student' });
    } catch (error) {
      console.log("Erro: ", error);
    }

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
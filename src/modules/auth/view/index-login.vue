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
import { AuthService } from '../auth.service';
import { pushMessageNotification } from "@/utils/notivue-base";
pushMessageNotification;

const email = ref('');
const password = ref('');
const authStore = useAuthStore();
const { loginService } = AuthService();

const emailSchema = yup
.string()
.required("E-mail é obrigatório")
.email("Formato de e-mail inválido")

const passwordSchema = yup
.string()
.required("A senha é obrigatória")

const submitForm = async () => {

  await emailSchema.validate(email.value);
  await passwordSchema.validate(password.value);
  
  try {
    const response = await loginService(email.value, password.value);
    const token = response.access_token;

    // salvando token no local storage após a autenticação
    authStore.setAuth({
      token: token
    });

    router.push({ name: 'Student' });

  } catch (error) {
    //resposta de erro do yup
    if (error instanceof yup.ValidationError) {
      pushMessageNotification({
        type: "error",
        title: "Erro de validação",
        message: error.message,
        duration: 3000,
      });
    }
  }
};
</script>

<style scoped>
</style>

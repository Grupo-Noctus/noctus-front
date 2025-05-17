<template>
    <Login
        v-model:email="email"
        v-model:password="password"
        redirectRouteName="Register"
        @updateCredencials="submitForm"
        :onSubmit="submitForm"
    />
</template>

<script setup lang="ts">
import { ref } from "vue";
import Login from "./components/login.vue";
import * as yup from "yup";
import router from "@/plugins/router/router";
import { useAuthStore } from "@/modules/auth/auth.store";
import { pushMessageNotification } from "@/utils/notivue-base";
pushMessageNotification;

const email = ref("");
const password = ref("");
const authStore = useAuthStore();

const emailSchema = yup
    .string()
    .required("E-mail é obrigatório")
    .email("Formato de e-mail inválido");

const passwordSchema = yup.string().required("A senha é obrigatória");

const submitForm = async (givenEmail: string, givenPassword: string) => {
    email.value = givenEmail.value.trim();
    password.value = givenPassword.value;
    
    try {
        await emailSchema.validate(email.value);
        await passwordSchema.validate(password.value);

        await authStore.loginStore(email.value, password.value);
    } catch (error) {
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

<style scoped></style>

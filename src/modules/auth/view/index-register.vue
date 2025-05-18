<template>
    <register
        v-model:formData="formData"
        redirectRouteName="Login"
        :onSubmit="submitForm"
        @updateFormData="submitForm"
    />
</template>

<script setup lang="ts">
import { ref } from "vue";
import Register from "./components/register/register-student.vue";
import * as yup from "yup";
import router from "@/plugins/router/router";
import { pushMessageNotification } from "@/utils/notivue-base";
pushMessageNotification;
import { AuthService } from "../auth.service";
import type { TRegisterFormDataTest } from "../auth.types";

const { registerService } = AuthService();

const formData = ref({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmationPassword: "",
    dateBirth: "",
    state: "",
    ethnicity: "",
    gender: "",
    educationLevel: "",
    hasDisability: false,
    disabilityType: "",
    needsSupportResources: false,
    supportResourcesDescription: "",
});

const fullSchema = yup.object({
    name: yup.string().required("Nome é obrigatório"),
    username: yup.string().required("Nome de usuário é obrigatório"),
    email: yup.string().email("Formato de e-mail inválido").required("E-mail é obrigatório"),
    password: yup
        .string()
        .min(6, "A senha deve ter pelo menos 6 caracteres")
        .required("Senha é obrigatória"),
    dateBirth: yup.string().when("email", {
        is: (val: string) => !val.endsWith("@matera.com"),
        then: (schema) => schema.required("Data de nascimento é obrigatória"),
        otherwise: (schema) => schema.strip(),
    }),
    state: yup.string().when("email", {
        is: (val: string) => !val.endsWith("@matera.com"),
        then: (schema) => schema.required("Estado é obrigatório"),
        otherwise: (schema) => schema.strip(),
    }),
    ethnicity: yup.string().when("email", {
        is: (val: string) => !val.endsWith("@matera.com"),
        then: (schema) => schema.required("Etnia é obrigatória"),
        otherwise: (schema) => schema.strip(),
    }),
    gender: yup.string().when("email", {
        is: (val: string) => !val.endsWith("@matera.com"),
        then: (schema) => schema.required("Gênero é obrigatório"),
        otherwise: (schema) => schema.strip(),
    }),
    educationLevel: yup.string().when("email", {
        is: (val: string) => !val.endsWith("@matera.com"),
        then: (schema) => schema.required("Nível de escolaridade é obrigatório"),
        otherwise: (schema) => schema.strip(),
    }),
    hasDisability: yup.boolean().when("email", {
        is: (val: string) => !val.endsWith("@matera.com"),
        then: (schema) => schema.required("Campo de deficiência é obrigatório"),
        otherwise: (schema) => schema.strip(),
    }),
    needsSupportResources: yup.boolean().when("email", {
        is: (val: string) => !val.endsWith("@matera.com"),
        then: (schema) => schema.required("Campo de recursos de apoio é obrigatório"),
        otherwise: (schema) => schema.strip(),
    }),
});

const submitForm = async () => {
    try {
        if (formData.value.password !== formData.value.confirmationPassword) {
            pushMessageNotification({
                type: "error",
                title: "Erro de validação",
                message: "As senhas devem ser iguais",
                duration: 3000,
            });
            return;
        }

        await fullSchema.validate(formData.value, { abortEarly: false });

        const dataToSend: TRegisterFormDataTest = {
            user: {
                name: formData.value.name,
                username: formData.value.username,
                email: formData.value.email,
                password: formData.value.password,
                image: null,
            },
            student: {
                dateBirth: formData.value.dateBirth,
                state: formData.value.state,
                ethnicity: formData.value.ethnicity,
                gender: formData.value.gender,
                educationLevel: formData.value.educationLevel,
                hasDisability: formData.value.hasDisability,
                disabilityType: formData.value.disabilityType,
                needsSupportResources: formData.value.needsSupportResources,
                supportResourcesDescription: formData.value.supportResourcesDescription,
            },
        };

        await registerService(dataToSend);

        pushMessageNotification({
            type: "success",
            title: "Sucesso",
            message: "Cadastro realizado com sucesso!",
            duration: 3000,
        });

        router.push({ name: "Login" });
    } catch (error: any) {
        if (error instanceof yup.ValidationError) {
            pushMessageNotification({
                type: "error",
                title: "Erro de validação",
                message: error.errors.join("; "),
                duration: 3000,
            });
        } else {
            console.error(error);
            pushMessageNotification({
                type: "error",
                title: "Erro inesperado",
                message: "Verifique os dados do formulário ou tente novamente.",
                duration: 3000,
            });
        }
    }
};
</script>

<style scoped></style>

<template>
    <v-container fluid class="full-height-container">
        <!-- Image (Left) -->
        <div class="bg-primary right-image-section">
            <v-img :src="imageSrc" cover fill-height></v-img>
        </div>

        <!-- Form Login (Right) -->
        <div class="bg-primary left-register-section">
            <v-card class="register-card" color="white">
                <div class="label-style">E-mail</div>
                <v-text-field
                    v-model="email"
                    required
                    density="default"
                    placeholder="Informe seu e-mail"
                    prepend-inner-icon="mdi-email-outline"
                    variant="outlined"
                ></v-text-field>

                <div class="label-style">Senha</div>
                <v-text-field
                    v-model="password"
                    required
                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'"
                    density="default"
                    placeholder="Informe sua senha"
                    prepend-inner-icon="mdi-lock-outline"
                    variant="outlined"
                    @click:append-inner="visible = !visible"
                ></v-text-field>

                <v-btn
                    class="mt-auto mb-8"
                    color="primary"
                    size="large"
                    block
                    @click="handleSubmit"
                >
                    Login
                </v-btn>

                <v-card-text class="register-button">
                    <div @click="redirectPage">
                        Não possui uma conta? Cadastre-se
                        <v-icon icon="mdi-chevron-right"></v-icon>
                    </div>
                </v-card-text>
            </v-card>
        </div>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import router from "@/plugins/router/router";
import imagem from "@/assets/img/image-login.png";

const props = defineProps<{
    email: string;
    password: string;
    redirectRouteName: string;
    onSubmit: () => void;
}>();

const email = ref(props.email);
const password = ref(props.password);

const imageSrc = ref(imagem);
const visible = ref(false);

const redirectPage = () => {
    router.push({ name: props.redirectRouteName });
};

const emit = defineEmits(["updateCredencials"]);

const handleSubmit = () => {
    //if (props.onSubmit)props.onSubmit();
    emit("updateCredencials", email, password);
};
</script>

<style scoped>
.full-height-container {
    display: flex;
    padding: 0;
    margin: 0;
    height: 100vh;
    overflow: hidden;
}

.left-register-section {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 1.5rem;
    flex: 1;
}

.register-card {
    margin-left: auto;
    margin-right: auto;
    padding: 2rem;
    padding-bottom: 3.75rem;
    box-shadow: 8;
    width: 100%;
    min-width: 340px;
    max-height: 800px;
}

.right-image-section {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.label-style {
    color: #615f5f;
    font-weight: bold;
}

.register-button {
    text-align: center;
    font-size: 1.05rem;
    font-weight: 500;
    color: #461cdc;
    cursor: pointer;
}
</style>

<template>
    <v-container fluid class="full-height-container">
        <!-- Form Register (Left) -->
        <div class="bg-primary left-register-section">
            <v-card class="register-card" color="white">
                <!-- STEP 1 -->
                <div v-if="step === 1">
                    <div class="label-style">Nome</div>
                    <v-text-field
                        v-model="formData.name"
                        required
                        density="compact"
                        placeholder="Informe seu nome"
                        prepend-inner-icon="mdi-account-outline"
                        variant="outlined"
                    ></v-text-field>

                    <div class="label-style">Nome de usuário</div>
                    <v-text-field
                        v-model="formData.username"
                        required
                        density="compact"
                        placeholder="Informe seu nome"
                        prepend-inner-icon="mdi-account-outline"
                        variant="outlined"
                    ></v-text-field>

                    <div class="label-style">E-mail</div>
                    <v-text-field
                        v-model="formData.email"
                        required
                        type="email"
                        density="compact"
                        placeholder="Informe seu e-mail"
                        prepend-inner-icon="mdi-email-outline"
                        variant="outlined"
                    ></v-text-field>

                    <div class="label-style">Senha</div>
                    <v-text-field
                        v-model="formData.password"
                        required
                        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                        :type="visible ? 'text' : 'password'"
                        density="compact"
                        placeholder="Informe sua senha"
                        prepend-inner-icon="mdi-lock-outline"
                        variant="outlined"
                        @click:append-inner="visible = !visible"
                    ></v-text-field>

                    <div class="label-style">Confirmar senha</div>
                    <v-text-field
                        v-model="formData.confirmationPassword"
                        required
                        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                        :type="visible ? 'text' : 'password'"
                        density="compact"
                        placeholder="Confirme sua senha"
                        prepend-inner-icon="mdi-lock-outline"
                        variant="outlined"
                        @click:append-inner="visible = !visible"
                    ></v-text-field>
                </div>

                <!-- STEP 2 -->
                <div v-if="step === 2">
                    <v-text-field
                        v-model="formData.dateBirth"
                        density="default"
                        label="Data de nascimento"
                        type="date"
                        variant="outlined"
                    ></v-text-field>

                    <v-select
                        v-model="formData.state"
                        clearable
                        density="default"
                        variant="outlined"
                        label="Estado"
                        :items="itemsState"
                        item-title="text"
                        item-value="value"
                    ></v-select>

                    <v-select
                        v-model="formData.ethnicity"
                        clearable
                        density="default"
                        variant="outlined"
                        label="Etinia"
                        :items="itemsEthnicity"
                        item-title="text"
                        item-value="value"
                    ></v-select>

                    <v-select
                        v-model="formData.gender"
                        clearable
                        density="default"
                        variant="outlined"
                        label="Genero"
                        :items="itemsGender"
                        item-title="text"
                        item-value="value"
                    ></v-select>

                    <v-select
                        v-model="formData.educationLevel"
                        clearable
                        density="default"
                        variant="outlined"
                        label="Nível Educacional"
                        :items="itemsEducationLevel"
                        item-title="text"
                        item-value="value"
                    ></v-select>
                </div>

                <!-- STEP 3 -->
                <div v-if="step === 3">
                    <v-select
                        v-model="formData.hasDisability"
                        clearable
                        density="compact"
                        variant="outlined"
                        label="Possui deficiência?"
                        :items="itemHasDisability"
                        item-title="text"
                        item-value="value"
                    ></v-select>

                    <v-textarea
                        v-model="formData.disabilityType"
                        clearable
                        row-height="25"
                        rows="3"
                        variant="outlined"
                        label="Tipo de deficiência:"
                    ></v-textarea>

                    <v-select
                        v-model="formData.needsSupportResources"
                        clearable
                        density="compact"
                        variant="outlined"
                        label="Precisa de recursos de apoio?"
                        :items="itemNeedsSupportResources"
                        item-title="text"
                        item-value="value"
                    ></v-select>

                    <v-textarea
                        v-model="formData.supportResourcesDescription"
                        clearable
                        row-height="25"
                        rows="3"
                        variant="outlined"
                        label="Descrição dos recursos de apoio:"
                    ></v-textarea>
                </div>

                <v-card-text class="navigation-buttons-container">
                    <div>
                        <div v-if="step > 1" class="register-button" @click.prevent="previousStep">
                            <v-icon icon="mdi-chevron-left"></v-icon>
                            Anterior
                        </div>
                    </div>

                    <div>
                        <div
                            v-if="showNextStepBtn"
                            class="register-button"
                            @click.prevent="nextStep"
                        >
                            Próximo
                            <v-icon icon="mdi-chevron-right"></v-icon>
                        </div>
                    </div>
                </v-card-text>

                <v-btn
                    v-if="showMateraRegisterBtn"
                    class="mt-auto mb-8"
                    color="primary"
                    size="large"
                    block
                    @click="handleSubmit"
                >
                    Cadastrar
                </v-btn>

                <v-card-text class="login-button">
                    <div @click="redirectPage">
                        Já possui uma conta? Login
                        <v-icon icon="mdi-chevron-right"></v-icon>
                    </div>
                </v-card-text>
            </v-card>
        </div>

        <!-- Image (Right) -->
        <div class="bg-primary right-image-section">
            <v-img :src="imageSrc" cover fill-height></v-img>
        </div>
    </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import imagem from "@/assets/img/image-register.png";
import router from "@/plugins/router/router";
import {
    itemsState,
    itemsEthnicity,
    itemsGender,
    itemsEducationLevel,
    itemHasDisability,
    itemNeedsSupportResources,
} from "../register/data/form-options";

const step = ref(1);
const imageSrc = ref(imagem);
const visible = ref(false);

const showMateraRegisterBtn = computed(
    () =>
        step.value === 3 ||
        props.formData.email.endsWith("@matera.com") ||
        props.formData.email.endsWith("@matera.com.br"),
);

const showNextStepBtn = computed(
    () =>
        step.value < 3 &&
        !props.formData.email.endsWith("@matera.com") &&
        !props.formData.email.endsWith("@matera.com.br"),
);

const props = defineProps<{
    formData: {
        name: string;
        username: string;
        email: string;
        password: string;
        confirmationPassword: string;
        dateBirthModel: string;
        stateModel: string;
        ethnicityModel: string;
        genderModel: string;
        educationLevelModel: string;
        hasDisabilityModel: boolean | false;
        disabilityTypeModel: string;
        needsSupportResourcesModel: boolean | false;
        supportResourcesDescriptionModel: string;
    };
    redirectRouteName: string;
    onSubmit: () => void;
}>();

const emit = defineEmits(["updateFormData"]);

const nextStep = () => {
    if (step.value < 3) step.value++;
};
const previousStep = () => {
    if (step.value > 1) step.value--;
};

const redirectPage = () => {
    router.push({ name: props.redirectRouteName });
};

const handleSubmit = () => {
    //if (props.onSubmit)props.onSubmit();
    emit("updateFormData", props.formData);
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
    padding-bottom: 2.75rem;
    box-shadow: 8;
    width: 100%;
    min-width: 340px;
    max-height: 800px;
}

.label-style {
    color: #615f5f;
    font-weight: bold;
    font-size: 0.875rem;
}

.login-button {
    text-align: center;
    font-size: 1.05rem;
    font-weight: 500;
    color: #6ff24b;
    cursor: pointer;
}

.register-button {
    cursor: pointer;
    text-decoration: none;
    color: #6ff24b;
    display: flex;
    align-items: center;
    font-size: 0.9rem;
    font-weight: bold;
}

.navigation-buttons-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
    font-weight: bold;
}

.right-image-section {
    display: flex;
    flex-direction: column;
    flex: 1;
}
</style>

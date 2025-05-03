<template>
    <v-container fluid class="d-flex pa-0 ma-0" style="height: 100vh; overflow: hidden;">
      <!-- Form Register (Left) -->
      <div class="d-flex justify-center align-center flex-column bg-primary pa-6" style="flex: 1;">
        <v-card
        class="mx-auto pa-8 pb-15"
        elevation="8"
        width="100%"
        min-width="340"
        color="secondary"
        max-height="800"
        >

        <!-- STEP 1 -->        
        <div v-if="step === 1">
          <div class="name-label text-body-2">Nome</div>
          <v-text-field v-model="formData.name" required         
            density="compact"
            placeholder="Informe seu nome"
            prepend-inner-icon="mdi-account-outline"
            variant="outlined"
            
          ></v-text-field>

        <div class="user-name-label text-body-2">Nome de usuário</div>
          <v-text-field v-model="formData.userName" required         
            density="compact"
            placeholder="Informe seu nome"
            prepend-inner-icon="mdi-account-outline"
            variant="outlined"
            @update:formData="formData"          
          ></v-text-field>

          <div class="email-label text-body-2">E-mail</div>
          <v-text-field v-model="formData.email" required 
            type="email"            
            density="compact"
            placeholder="Informe seu e-mail"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
            
          ></v-text-field>
  
          <div class="d-flex align-center justify-space-between password-label text-body-2">Senha</div>
            <v-text-field v-model="formData.password" required          
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              density="compact"
              placeholder="Informe sua senha"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"              
              @click:append-inner="visible = !visible"
  
            ></v-text-field>
    
          <div class="confirmationPassword text-body-2">Confirmar senha</div>
            <v-text-field v-model="formData.confirmationPassword" required             
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
          <v-text-field v-model="formData.dateBirth"            
            density="default"
            label="Data de nascimento"
            type="date"
            variant="outlined"

          ></v-text-field>
  
          <v-select v-model="formData.state" clearable density="default" variant="outlined"
            label="Estado"            
            :items="itemsState"
            
          ></v-select>
  
          <v-select v-model="formData.ethnicity" clearable density="default" variant="outlined"            
            label="Etinia"            
            :items="itemsEthnicity"
            
          ></v-select>
  
          <v-select v-model="formData.gender" clearable density="default" variant="outlined"            
            label="Genero"            
            :items="itemsGender"
            
          ></v-select>

          <v-select v-model="formData.educationLevel" clearable density="default" variant="outlined"
            label="Nível Educacional"            
            :items="itemsEducationLevel"
           
          ></v-select>  
        </div>
  
        <!-- STEP 3 -->
        <div v-if="step === 3">    
          <v-select v-model="formData.hasDisability" clearable density="compact" variant="outlined"            
            label="Possui deficiência?"            
            :items="itemHasDisability"
            
          ></v-select>

          <v-textarea v-model="formData.disabilityType" clearable row-height="25" rows="3" variant="outlined"          
          label="Tipo de deficiência:"  
          ></v-textarea>

          <v-select v-model="formData.needsSupportResources" clearable density="compact" variant="outlined"            
            label="Precisa de recursos de apoio?"            
            :items="itemNeedsSupportResources"
            
          ></v-select>

          <v-textarea v-model="formData.supportResourcesDescription" clearable row-height="25" rows="3" variant="outlined"          
          label="Descrição dos recursos de apoio:"         
          ></v-textarea>  
        </div>  
  
          <v-card-text class="d-flex justify-space-between align-center text-subtitle-2 font-weight-bold">
            <div>      
              <v-link v-if="step > 1"
                class="text-decoration-none register-button"
                style="cursor: pointer;"
                @click.prevent="previousStep"
              >
              <v-icon icon="mdi-chevron-left"></v-icon>
                Anterior
              </v-link>
            </div>
  
            <div>
              <v-link v-if="step < 3 && !formData.email.endsWith('@matera.com') && !formData.email.endsWith('@matera.com.br')"
                class="text-decoration-none register-button"
                style="cursor: pointer;"
                @click.prevent="nextStep"
              >
                Próximo
                <v-icon icon="mdi-chevron-right"></v-icon>
              </v-link>
            </div>
          </v-card-text>
  
          <v-btn v-if="step === 3 || formData.email.endsWith('@matera.com') || formData.email.endsWith('@matera.com.br')" class="mt-auto mb-8" color="primary" size="large" block @click=handleSubmit>
            Cadastrar
          </v-btn>

          <v-card-text class="text-center text-subtitle-1 login-button">
          <v-link
            class="text-decoration-none register-button"
            style="cursor: pointer;"
            @click.prevent="redirectPage"
  
          >
            Já possui uma conta? Login
            <v-icon icon="mdi-chevron-right"></v-icon>
          </v-link>
        </v-card-text>
  
        </v-card>
  
      </div>
  
      <!-- Image (Right) -->
      <div class="d-flex flex-column bg-primary" style="flex: 1;">
        <v-img
        :src="imageSrc"
        cover
        fill-height
        ></v-img>
      </div>

    </v-container>
</template>
      
<script setup lang="ts">
  import { ref } from 'vue';
  import imagem from '@/assets/img/image-register.png';
  import router from "@/plugins/router/router";
  import {
    itemsState,
    itemsEthnicity,
    itemsGender,
    itemsEducationLevel,
    itemHasDisability,
    itemNeedsSupportResources,
  } from '../register/data/form-options';
  
  const step = ref(1);
  const imageSrc = ref(imagem)
  const visible = ref(false);

  const props = defineProps<{
    formData: {
      name: string;
      userName: string;
      email: string;
      password: string;
      confirmationPassword: string;
      dateBirthModel: string;
      stateModel: string;
      ethnicityModel: string;
      genderModel: string;
      educationLevelModel: string;
      hasDisabilityModel: string;
      disabilityTypeModel: string;
      needsSupportResourcesModel: string;
      supportResourcesDescriptionModel: string;
    }
    redirectRouteName: string;
    onSubmit: () => void;
  }>();
  
  const emit = defineEmits<{
  (e: 'updateFormData', data: typeof props.formData): void;
  }>()
  
  const update = (field: keyof typeof props.formData, value:string) => {
    emit('updateFormData', {
      ...props.formData,
      [field]: value
    })
  }
    
  const nextStep = () => { if(step.value < 3) step.value++ }
  const previousStep = () => { if(step.value > 1) step.value-- }
  
  const redirectPage = () => {
    router.push({ name: props.redirectRouteName })
  }

  const handleSubmit = () => {
      if (props.onSubmit)props.onSubmit();
  }
    
    
</script>
      
<style scoped>
  .register-button {
    color: #6FF24B;
  }
</style>
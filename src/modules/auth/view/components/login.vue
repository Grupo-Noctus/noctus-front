<template>
  <v-container fluid class="d-flex pa-0 ma-0" style="height: 100vh; overflow: hidden;">
    <!-- Image (Left) -->
    <div class="d-flex flex-column bg-primary" style="flex: 1;">
      <v-img
      :src="imageSrc"
      cover
      fill-height
      ></v-img>
    </div>

    <!-- Form Login (Right) -->
    <div class="d-flex justify-center align-center flex-column bg-primary pa-6" style="flex: 1;">
      <v-card
        class="mx-auto pa-8 pb-8"
        elevation="8"
        width="100%"
        min-width="80"
        color="secondary"
        height="100%"
        max-height="380"
      >

        <div class="email-label font-weight-bold">E-mail</div>
        <v-text-field v-model="email" required          
          density="default"
          placeholder="Informe seu e-mail"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"          
        ></v-text-field>

        <div class="d-flex align-center justify-space-between password-label font-weight-bold">Senha</div>
        <v-text-field v-model="password" required           
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="default"
          placeholder="Informe sua senha"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"          
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-btn class="mt-auto mb-8" color="primary" size="large" block @click=handleSubmit>
          Login
        </v-btn>

        <v-card-text class="text-center text-subtitle-1 login-button">
          <v-link
            class="text-decoration-none register-button"
            style="cursor: pointer;"
            @click.prevent="redirectPage"
  
          >
            Não possui uma conta? Cadastre-se
            <v-icon icon="mdi-chevron-right"></v-icon>
          </v-link>
        </v-card-text>

      </v-card>
    </div>
  </v-container>
</template>
  
<script setup lang="ts">
  import { ref, computed } from 'vue';
  import router from "@/plugins/router/router";
  import imagem from '@/assets/img/image-login.png';
    
  const imageSrc = ref(imagem)
  
  const visible = ref(false);
  
  const redirectPage = () => {
      router.push({ name: props.redirectRouteName })
  }
  
  const props = defineProps<{
    email: string;
    password: string;
    redirectRouteName: string;
    onSubmit: () => void;
  }>();
  
  const emit = defineEmits(['update:email', 'update:password']);
  
  const email = computed({
    get: () => props.email,
    set: (value) => emit('update:email', value)
  });
  
  const password = computed({
    get: () => props.password,
    set: (value) => emit('update:password', value)
  });
  
  const handleSubmit = () => {
      if (props.onSubmit)props.onSubmit();
  }

</script>
  
<style scoped>
  .email-label {
    color: #615f5f;
  }
  
  .password-label {
    color: #615f5f;
  }

  .login-button {
    color:#461CDC
  }
</style>
<script setup lang="ts">

import { ref } from 'vue'
import { useDateStore } from '../stores/main';
import { useTheme } from 'vuetify'

const dateStore = useDateStore();

const theme = useTheme()
const isDarkTheme = ref(false);

const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value;
  theme.global.name.value = isDarkTheme.value ? 'dark' : 'light'
};

</script>

<template>
  
  <div>
  <v-card color='primary'>
  <h1>Home</h1> 
  <p>Data atual: {{ dateStore.formattedDate }}</p>
  <button @click="dateStore.updateDate">Atualizar Data</button>
  <p>Data formatada MM: {{ dateStore.formattedDateMM }}</p>
<v-btn @click="toggleTheme" color="primary">
  {{ isDarkTheme ? 'Modo Claro' : 'Modo Escuro' }}
</v-btn>
</v-card>
</div>



</template>

<style scoped>

</style>
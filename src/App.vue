<template>
    <v-app>
      <router-view></router-view>
    </v-app>
  </template>

  <script setup lang="ts">
  import { onMounted } from "vue";
  import { useTheme } from "vuetify";
  import { useIndexStore } from "./stores/index.store";

  const theme = useTheme();
  const indexStore = useIndexStore();

  onMounted(() => {
    theme.global.name.value = localStorage.getItem("theme") || "light";

    indexStore.currentTheme = theme.global.name.value;
    if (indexStore.currentTheme === "dark") {
      indexStore.isDark = true;
    } else {
      indexStore.isDark = false;
    }
  });
  </script>

  <style scoped>
  </style>

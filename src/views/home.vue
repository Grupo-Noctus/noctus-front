<script setup lang="ts">
import { useIndexStore } from "../stores/index.store.ts";

const indexStore = useIndexStore();
</script>

<template>
    <div>
        <h1>Home</h1>
        <p>Data atual: {{ indexStore.formattedDate }}</p>
        <button @click="indexStore.updateDate">Atualizar Data</button>
        <p>Data formatada MM: {{ indexStore.formattedDateMM }}</p>
    </div>
</template>

<style scoped></style>

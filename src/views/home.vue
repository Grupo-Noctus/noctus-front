<script setup lang="ts">
import { useDateStore } from "../stores/main";

const dateStore = useDateStore();
</script>

<template>
    <div>
        <h1>Home</h1>
        <p>Data atual: {{ dateStore.formattedDate }}</p>
        <button @click="dateStore.updateDate">Atualizar Data</button>
        <p>Data formatada MM: {{ dateStore.formattedDateMM }}</p>
    </div>
</template>

<style scoped></style>

<template>
    <div style="background-color: grey">
        <ul>
            <li>
                <router-link :to="{ name: 'Home' }">Login</router-link>
            </li>
            <li>
                <router-link :to="{ name: 'Alunos' }">Aluno</router-link>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

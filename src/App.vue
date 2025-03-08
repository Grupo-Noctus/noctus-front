<template>
  <ul>
    <li>
      <router-link :to="{name: 'login'}">Login</router-link>
    </li>
    <li>
      <router-link :to="{name: 'home'}">Home</router-link>
    </li>
    <li>
      <router-link :to="{name: 'alunos'}">Alunos</router-link>
    </li>
  </ul>
  <router-view/>
</template>

<script setup lang="ts">


</script>

<style scoped>

</style>
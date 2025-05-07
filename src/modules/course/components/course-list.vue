<template>
    <div>
        {{courses}}
    </div>
</template>


<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { CourseService } from '../course.service';
import { ref } from 'vue';
const courses = ref()
 const courseService = CourseService()
 onBeforeMount(async() => {
    return courses.value = await courseService.getCourseService()
 })
</script>



<style scoped>

</style>

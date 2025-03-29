<script setup>
import { pushMessageNotification } from "@/utils/notivue-base";
pushMessageNotification;

const customNotification = () => {
    pushMessageNotification({
        type: "success",
        title: "title",
        message: "message",
        props: {
            progress: true,
        },
        duration: 3000,
    });
};
</script>

<template>
    <v-btn @click="customNotification">progress</v-btn>
</template>

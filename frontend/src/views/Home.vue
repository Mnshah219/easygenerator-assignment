<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import useAuthStore from '../stores/auth-store';

const authStore = useAuthStore();

</script>
<template>
    <div class="text-h6">
        Hi {{ authStore.user.name }}, Congratulations! You made it to the end of this assignment
    </div>
</template>
<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import useAuthStore from '../stores/auth-store';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const onLogout = () => {
    authStore.logout();
    router.push('/signin');
}

</script>
<template>
    <div class="text-h6">
        Hi {{ authStore.user.name }}, Congratulations! You made it to the end of this assignment. Although, there is'nt much to do here except maybe try to
        <div clickable @click="onLogout" class="text-blue cursor-pointer"> logout </div>
    </div>
</template>
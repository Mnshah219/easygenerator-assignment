
<script setup>
import { reactive, ref } from 'vue';
import { required, email } from '@/common/validators';
import useAuthStore from '@/stores/auth-store.js';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const signinState = reactive({
    email: '',
    password: ''
});
const loading = ref(false);
const router = useRouter();
const onSignIn = async () => {
    loading.value = true;
    const success = await authStore.signin(signinState);
    if (success) router.push('/');
    loading.value = false;
}
</script>
<template>
    <QForm @submit="onSignIn">
        <QCard class="q-pa-md shadow-2 card_wrapper" bordered>
        <QCardSection class="text-center">
            <div class="text-grey-9 text-h5 text-weight-bold">Sign in</div>
            <div class="text-grey-8">Sign in below to access your account</div>
        </QCardSection>
        <QCardSection>
        <QInput no-error-icon dense outlined type="email" placeholder="Email Address" :rules="[required('Email'), email]" lazy-rules v-model="signinState.email" />
            <QInput no-error-icon dense outlined class="q-mt-md" type="password" placeholder="Password" :rules="[required('Password')]" lazy-rules v-model="signinState.password" />
        </QCardSection>
        <QCardSection>
            <QBtn style="border-radius: 8px;" color="dark" rounded size="md" label="Sign in" no-caps class="full-width" type="submit" :loading="loading" />
        </QCardSection>
        <QCardSection class="text-center q-pt-none">
            <div class="text-grey-8">Don't have an account yet?
                <RouterLink to="/signup" class="text-dark text-weight-bold" style="text-decoration: none">
                    Sign up.
                </RouterLink>
            </div>
        </QCardSection>
    </QCard>
    </QForm>
</template>
<style scoped>

.card_wrapper {
  width: 25rem;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

</style>
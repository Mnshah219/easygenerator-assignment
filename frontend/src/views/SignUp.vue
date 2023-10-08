
<script setup>
import { computed, reactive, ref } from 'vue';
import { required, email } from '@/common/validators';
import useAuthStore from '@/stores/auth-store.js';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const signupState = reactive({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
});
const loading = ref(false);
const router = useRouter();
const onSignUp = async () => {
    loading.value = true;
    const success = await authStore.signup(signupState);
    if (success) router.push('/signin');
    loading.value = false;
}
const passRules = [
    { rule: (val) => val.length >= 8, msg: 'Password must be atleast 8 characters' },
    { rule: (val) => val.match(/.*\d.*/), msg: 'Password must contain atleast 1 digit' },
    { rule: (val) => val.match(/.*[a-zA-Z].*/), msg: 'Password must contain atleast 1 letter' },
    { rule: (val) => val.match(/.*[\@#\!\-_\.].*/), msg: 'Password must contain atleast 1 special character (@#!-_.)' } 
];
const isPassError = computed(() => Boolean(signupState.password) &&  passRules.some(({ rule }) => !rule(signupState.password)))
</script>
<template>
    <QForm @submit="onSignUp">
        <QCard class="q-pa-md shadow-2 card_wrapper" bordered>
        <QCardSection class="text-center">
            <div class="text-grey-9 text-h5 text-weight-bold">Sign up</div>
            <div class="text-grey-8">Sign up below to create an account</div>
        </QCardSection>
        <QCardSection>
            <QInput no-error-icon dense outlined type="name" placeholder="User Name" :rules="[required('Name')]" lazy-rules v-model="signupState.name" />
            <QInput no-error-icon dense outlined type="email" placeholder="Email Address" :rules="[required('Email'), email]" lazy-rules v-model="signupState.email" />
            <QInput no-error-icon dense outlined type="password" placeholder="Password" lazy-rules :rules="[required('Password')]" :error="isPassError" v-model="signupState.password" />
            <ul v-if="isPassError" class="text-subtitle2 q-mt-none q-pl-xs" style="list-style: none;">
                <li v-for="(passRule, idx) in passRules" :key="idx" :class="passRule.rule(signupState.password) ? 'text-positive' : 'text-negative'">
                    <QIcon :name="passRule.rule(signupState.password) ? 'check' : 'clear'" />
                    {{ passRule.msg }}
                </li>
            </ul>
            <QInput no-error-icon dense outlined type="password" placeholder="Confirm Password" lazy-rules :rules="[(val) => !signupState.password || val === signupState.password || 'Confirm password must be same as password']" v-model="signupState.confirmPassword" />
        </QCardSection>
        <QCardSection>
            <QBtn style="border-radius: 8px;" color="dark" rounded size="md" label="Sign up" no-caps class="full-width" type="submit" :loading="loading" />
        </QCardSection>
        <QCardSection class="text-center q-pt-none">
            <div class="text-grey-8">Already have an account?
                <RouterLink to="/signin" class="text-dark text-weight-bold" style="text-decoration: none">
                    Sign in.
                </RouterLink>
            </div>
        </QCardSection>
    </QCard>
    </QForm>
</template>
<style scoped>

.card_wrapper {
  width: 30rem;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}

</style>
import { defineStore } from 'pinia';
import { signin as signinApi, signup as signupApi, fetchUserProfile as fetchUserProfileApi } from '@/apis/auth';
import { Notify } from 'quasar';

const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null
    }),
    actions: {
        async signin({ email, password }) {
            const response = await signinApi({ email, password });
            if (response) {
                localStorage.setItem('accessToken', response.access_token);
                this.user = response.user;
                return true;
            }
            return false;
        },

        async signup({ email, password, name }) {
            const response = await signupApi({ email, password, name });
            if (response) {
                Notify.create({
                    type: 'positive',
                    message: 'Account created successfully',
                    icon: 'none',
                    iconSize: '0px'
                });
                return true;
            }
            return false;
        },

        logout() {
            localStorage.removeItem('accessToken');
            this.user = null;
        },

        async fetchUserProfile() {
            const user = await fetchUserProfileApi();
            this.user = user;
        },

        isAuth() {
            return localStorage.getItem('accessToken')
        }
    }
})

export default useAuthStore;
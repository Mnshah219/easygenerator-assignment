import { getErrorMessage } from '../common/util';
import  axios from './axios';
import { Notify } from 'quasar'
export async function signin({ email, password }) {
    try {
        const response = await axios.post('/auth/signin', {
            email,
            password
        });
        return response.data
    } catch (err) {
        Notify.create({
            type: 'negative',
            message: getErrorMessage(err),
            icon: 'none',
            iconSize: '0px'
        });
        return null
    }
}

export async function signup({ email, password, name }) {
    try {
        const response = await axios.post('/auth/signup', {
            email,
            password,
            name
        });
        return response.data
    } catch (err) {
        Notify.create({
            type: 'negative',
            message: getErrorMessage(err),
            icon: 'none',
            iconSize: '0px'
        });
        return null
    }
}

export async function fetchUserProfile () {
    try {
        const response = await axios.get('/user/profile')
        return response.data;
    } catch (err) {
        Notify.create({
            type: 'negative',
            message: getErrorMessage(err),
            icon: 'none',
            iconSize: '0px'
        });
        return null
    }
}

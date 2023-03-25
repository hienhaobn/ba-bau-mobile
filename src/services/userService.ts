import axios from 'axios';
import { useDispatch } from 'react-redux';

import { EEvnKey } from '../constants/env.constant';

import { userLogin, userLogout } from 'states/user';

const API_URL = process.env[EEvnKey.API_URL];
const dispatch = useDispatch();

export const register = (email: string, phone: string, password: string) => {
    return axios.post(API_URL + 'accounts', {
        email,
        phone,
        password,
    });
};

export const login = async (email: string, password: string) => {
    try {
        const response: User.UserLogin = await axios.post(
            API_URL + 'login',
            {
                email,
                password,
            }
        );
        if (response.jwt) {
            // save to reducer
            dispatch(userLogin(response));
        }
        return response;
    } catch (error) {
        console.debug('Error:: Login service');
        return;
    }
};

export const logout = () => {
    dispatch(userLogout());
};

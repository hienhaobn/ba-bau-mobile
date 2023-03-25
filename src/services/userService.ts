import axios from 'axios';
import { useDispatch } from 'react-redux';

import { EEvnKey } from '../constants/env.constant';

import { userLogin, userLogout } from 'states/user';

const API_URL = process.env[EEvnKey.API_URL];
const dispatch = useDispatch();

const register = (user: User.UserRegisterRequest) => {
    return axios.post(API_URL + 'accounts', user);
};

const login = async (user: User.UserLoginRequest) => {
    try {
        const response: User.UserLoginResponse = await axios.post(API_URL + 'login', user);
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

const logout = () => {
    dispatch(userLogout());
};

const UserService = {
    register,
    login,
    logout,
};

export default UserService;

import axios from 'axios';
import { useDispatch } from 'react-redux';

import axiosInstance from './api-requests';

import { BASE_URL } from 'configs/api';

import { GlobalVariables } from 'constants/index';

import { resetStack } from 'navigation/utils';

import { useAppDispatch } from 'states/index';
import { userLogin, userLogout } from 'states/user';

import Storages, { KeyStorage } from 'utils/storages';

const dispatch = useDispatch();

const register = async (user: User.UserRegisterRequest) => {
    try {
        console.log('register')
        return await axiosInstance.post('/accounts', user)
    } catch (error) {
        console.log('erorr', error);
    }
};

const login = async (user: User.UserLoginRequest) => {
    try {
        // const response: User.UserLoginResponse = await axiosInstance.post('/login', user);
        // if (response.jwt) {
        //     // save to reducer
        //     dispatch(userLogin(response));
        // }
        console.log('response:: ');
        // if (response?.data?.accessToken) {
        //     GlobalVariables.tokenInfo = {
        //         accessToken: response?.data?.accessToken,
        //         refreshToken: response?.data?.refreshToken,
        //     };
        //     Storages.saveObject(KeyStorage.Token, GlobalVariables.tokenInfo);
        //     resetStack('Main');
        // }
        // return response;
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

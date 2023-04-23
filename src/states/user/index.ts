import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { BASE_URL } from 'configs/api';
import { GlobalVariables } from 'constants/index';
import { resetStack } from 'navigation/utils';
import { setMessage } from 'states/message';
import Storages, { KeyStorage } from 'utils/storages';
import { showCustomToast } from 'utils/toast';

const initialState = {
    data: [],
    isLoggedIn: false,
    userInfo: {},
    jwt: null,
    error: '',
    success: false,
};

export const fetchLogin = createAsyncThunk('user/login', async (user: user.UserLoginRequest, thunkAPI) => {
    try {
        const response = await axios.post(`${BASE_URL}/accounts/login`, user);
        if (response?.data?.jwt) {
            GlobalVariables.tokenInfo = {
                accessToken: response?.data?.jwt,
            };
            Storages.saveObject(KeyStorage.Token, GlobalVariables.tokenInfo);
            resetStack('Main');
            showCustomToast('Đăng nhập thành công');
        }
    } catch (error) {
        showCustomToast('Đăng nhập thất bại');
        const message =
            (error.message && error.response.data && error.response.data.message) || error.message || error.toString();
        thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue(message);
    }
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogin: (state, action) => {
            state.data = action.payload;
        },
        userLogout: (state) => {
            state = initialState;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.userInfo = action.payload;
        });
        builder.addCase(fetchLogin.rejected, (state, action) => {
            state.isLoggedIn = false;
            state.userInfo = null;
        });
    },
});

export const { userLogin, userLogout } = userSlice.actions;

export default userSlice.reducer;

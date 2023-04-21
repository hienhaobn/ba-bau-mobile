import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { UserService } from 'services';

import axiosInstance from 'services/api-requests';

import { setMessage } from 'states/message';

const initialState = {
    data: [],
    isLoggedIn: false,
    userInfo: {},
    jwt: null,
    error: '',
    success: false,
};

// export const fetchRegister = createAsyncThunk('user/register', async (user: User.UserRegisterRequest, thunkAPI) => {
//     try {
//         console.log('fetchRegister')
//         const response = await UserService.register(user);
//         thunkAPI.dispatch(setMessage(response));
//         return response;
//     } catch (error) {
//         const message =
//             (error.message && error.response.data && error.response.data.message) || error.message || error.toString();
//         thunkAPI.dispatch(setMessage(message));
//         return thunkAPI.rejectWithValue(message);
//     }
// });

export const fetchRegister = createAsyncThunk('user/fetchRegister', async (user: User.UserRegisterRequest) => {
    console.log('vao day roi')
    const res = axiosInstance
        .post('/accounts', user)
        .catch((err) => {
            console.log('error:: ', err);
            throw err;
        })
        .then((data) => data);
    return res;
});

export const fetchLogin = createAsyncThunk('user/login', async (user: User.UserLoginRequest, thunkAPI) => {
    try {
        const data = await UserService.login(user);
        return { user: data };
    } catch (error) {
        const message =
            (error.message && error.response.data && error.response.data.message) || error.message || error.toString();
        thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue(message);
    }
});

export const logout = createAsyncThunk('user/logout', async () => {
    await UserService.logout();
});

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogin: (state, action) => {
            console.log('userLogin', action);
            state.data = action.payload;
        },
        userLogout: (state) => {
            console.log('userLogout', state);
            state = initialState;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRegister.fulfilled, (state, action) => {
            state.isLoggedIn = false;
        });
        builder.addCase(fetchRegister.rejected, (state, action) => {
            state.isLoggedIn = false;
        });
        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.userInfo = action.payload;
        });
        builder.addCase(fetchLogin.rejected, (state, action) => {
            state.isLoggedIn = false;
            state.userInfo = null;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.isLoggedIn = false;
            state.userInfo = null;
        });
    },
});

export const { userLogin, userLogout } = userSlice.actions;

export default userSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { UserService } from 'services';

import { setMessage } from 'states/message';

const initialState = {
    data: [],
    isLoggedIn: false,
    userInfo: {},
    jwt: null,
    error: '',
    success: false,
};

export const registerAsync = createAsyncThunk('user/registerAsync', async () => {});
export type TodoId = string;
export type Todo = {
    id: TodoId;
    title: string;
    completed: boolean;
};

export const fetchUsersAsync = createAsyncThunk<Todo[]>('user/fetchUsersAsync', async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);
    // Get the JSON from the response:
    const data = await response.json();

    // Return result:
    return data;
});

export const register = createAsyncThunk('user/register', async (user: User.UserRegisterRequest, thunkAPI) => {
    try {
        const response = await UserService.register(user);
        thunkAPI.dispatch(setMessage(response));
        return response;
    } catch (error) {
        const message =
            (error.message && error.response.data && error.response.data.message) || error.message || error.toString();
        thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue(message);
    }
});

export const login = createAsyncThunk('user/login', async (user: User.UserLoginRequest, thunkAPI) => {
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
        builder.addCase(fetchUsersAsync.pending, (state, { payload }) => {
            console.log('Pending::');
        });
        builder.addCase(fetchUsersAsync.fulfilled, (state, { payload }) => {
            state.data.push(...payload);
        });
        builder.addCase(fetchUsersAsync.rejected, (state, { payload }) => {
            console.log('payload', payload);
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.isLoggedIn = false;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.isLoggedIn = false;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.userInfo = action.payload;
        });
        builder.addCase(login.rejected, (state, action) => {
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

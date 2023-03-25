import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLogin: (state, action) => {
            console.log('userLogin', action)
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
    },
});

export const { userLogin, userLogout } = userSlice.actions;

export default userSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { BASE_URL } from 'configs/api';

import axiosInstance from 'services/api-requests';

import { setMessage } from 'states/message';
import { ICreateFetalMovementRequest } from 'states/types';

const initialState: fetal.State = {
    movements: null,
    loadingCreated: false,
};

export const createFetalMovement = createAsyncThunk('fetal/createFetalMovement', async (body: ICreateFetalMovementRequest) => {
    try {
        const response = axiosInstance.post(`${BASE_URL}/fetal-movements`);
        return response;
    } catch (error) {
        console.log(error);
    }
});

export const fetalSlice = createSlice({
    name: 'Fetal',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createFetalMovement.fulfilled, (state, action) => {
            console.log(action.payload)
            state.loadingCreated = false;
        })
        builder.addCase(createFetalMovement.rejected, (state, action) => {
            state.loadingCreated = false;
        })
        builder.addCase(createFetalMovement.pending, (state, action) => {
            state.loadingCreated = true;
        })
    },
})

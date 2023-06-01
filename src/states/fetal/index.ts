import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

import { BASE_URL } from 'configs/api';
import axiosInstance from 'services/api-requests';
import { ICreateFetalMovementRequest } from 'states/types';
import { showCustomToast } from 'utils/toast';
import { hideLoading, showLoading } from '../../components/Loading';

const initialState: fetal.State = {
    data: {
        count: 0,
        current_page: 1,
        fetalMove: [],
        total_page: 1,
    },
    dueDate: '0',
    fetalDevelopmentWeekly: {
        current_page: '',
        total_page: 0,
        count: 0,
        vifetalDevelopmentWeekliesdeos: [],
        createdAt: '',
        updatedAt: '',
    },
    isLoading: false,
};

export const createFetalMovement = createAsyncThunk('fetal/createFetalMovement', async (body: ICreateFetalMovementRequest) => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}/fetal-movements`, body);
        showCustomToast('Thành công');
        return response;
    } catch (error) {
        showCustomToast('Đếm cử động thất bại')
        console.log(error);
    }
});

export const fetchMovementByDateNow = createAsyncThunk<fetal.FetalResponse>('fetal/fetchMovementByDateNow', async (date: Date) => {
   try {
       // showLoading();
       const response: fetal.FetalResponse = await axiosInstance.get(`${BASE_URL}/fetal-movements?date=${moment(date).format('DD/MM/YYYY')}`);
       // hideLoading();
       return response;
   } catch (error) {
       // hideLoading();
       showCustomToast('Lấy dữ liệu thất bại')
       console.log(error);
   }
});

export const fetchFetalDevelopmentWeekly = createAsyncThunk<fetal.FetalDevelopmentWeeklyResponse>('fetal/fetchFetalDevelopmentWeekly', async () => {
    try {
        const response: fetal.FetalDevelopmentWeeklyResponse = await axiosInstance.get(`${BASE_URL}/fetal-development-weekly?page=1&size=50`);
        return response;
    } catch (error) {
        showCustomToast('Lấy dữ liệu thất bại')
        console.log(error);
    }
})

export const fetalSlice = createSlice({
    name: 'Fetal',
    initialState,
    reducers: {
        updateDueDate: (state, action) => {
            state.dueDate = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createFetalMovement.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(createFetalMovement.rejected, (state, action) => {
                state.isLoading = false;
            })
            .addCase(createFetalMovement.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(fetchMovementByDateNow.pending, (state, action) => {
                state.data.fetalMove = [];
                state.isLoading = true;
            })
            .addCase(fetchMovementByDateNow.rejected, (state, action) => {
                state.data.fetalMove = [];
                state.isLoading = false;
            })
            .addCase(fetchMovementByDateNow.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchFetalDevelopmentWeekly.pending, (state, action) => {
                state.fetalDevelopmentWeekly = initialState.fetalDevelopmentWeekly;
                state.isLoading = true;
            })
            .addCase(fetchFetalDevelopmentWeekly.rejected, (state, action) => {
                state.fetalDevelopmentWeekly = initialState.fetalDevelopmentWeekly;
                state.isLoading = false;
            })
            .addCase(fetchFetalDevelopmentWeekly.fulfilled, (state, action) => {
                state.fetalDevelopmentWeekly.vifetalDevelopmentWeekliesdeos = action.payload.vifetalDevelopmentWeekliesdeos;
                state.fetalDevelopmentWeekly.current_page = action.payload.current_page;
                state.fetalDevelopmentWeekly.total_page =  action.payload.total_page;
                state.fetalDevelopmentWeekly.count = action.payload.count;
                state.fetalDevelopmentWeekly.createdAt = action.payload.createdAt;
                state.fetalDevelopmentWeekly.updatedAt = action.payload.updatedAt;
                state.isLoading = false;
            })
    },
});

export const { updateDueDate } = fetalSlice.actions;

export default fetalSlice.reducer;

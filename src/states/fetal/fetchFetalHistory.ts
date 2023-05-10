import axios from 'axios';

import { BASE_URL } from 'configs/api';

import { GlobalVariables } from 'constants/index';

import axiosInstance from 'services/api-requests';

import { showCustomToast } from 'utils/toast';

export const fetchFetalHistory = async () => {
    try {
        const res: fetal.FetalHistoryResponse = await axiosInstance.get(`/baby-diaries`);
        return res;
    } catch (error) {
        showCustomToast(error?.response?.data?.message);
        console.log(error);
    }
};

export const createFetalHistory = async (body: { file: object; note: string; weeksOfPregnancy: string }) => {
    try {
        const bodyFormData = new FormData();
        console.log('body.file', body.file)
        bodyFormData.append('image', body.file);
        bodyFormData.append('note', body.note);
        bodyFormData.append('weeksOfPregnancy', body.weeksOfPregnancy);
        const token = GlobalVariables?.tokenInfo?.accessToken
            ? `Bearer ${GlobalVariables?.tokenInfo?.accessToken}`
            : '';

        // const response = await axios({
        //     method: 'POST',
        //     url: `${BASE_URL}/baby-diaries`,
        //     data: bodyFormData,
        //     headers: { 'Content-Type': 'multipart/form-data', 'Accept': 'application/json', 'Authorization': token },
        // });
        // console.log('response', response);
        const response = await axios.post(`${BASE_URL}/baby-diaries`, bodyFormData, {
            headers: { 'Content-Type': 'multipart/form-data', 'Authorization': token },
        });

        console.log('response', response);
        return response;
    } catch (error) {
        showCustomToast(error?.response?.data?.message);
        console.log('error', error?.response?.data);
    }
};

import axiosInstance from 'services/api-requests';

import { showCustomToast } from 'utils/toast';

export const fetchFetalHistory = async () => {
    try {
        const res: fetal.FetalHistory[] = await axiosInstance.get(`/baby-diaries`);
        return res;
    } catch (error) {
        showCustomToast(error?.response?.data?.message);
        console.log(error);
    }
};

export const createFetalHistory = async (body: { file: object; note: string; weeksOfPregnancy: string }) => {
    try {
        const data = new FormData();
        data.append('file', body.file);
        data.append('note', body.note);
        data.append('weeksOfPregnancy', body.weeksOfPregnancy);
        const res: fetal.FetalHistory[] = await axiosInstance.post(`/baby-diaries`, data);
        return res;
    } catch (error) {
        showCustomToast(error?.response?.data?.message);
        console.log(error);
    }
};

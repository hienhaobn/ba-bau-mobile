import { hideLoading, showLoading } from 'components/Loading';
import axiosInstance from 'services/api-requests';

import { showCustomToast } from 'utils/toast';

export const createMomCheckups = async (body: user.MomCheckupsRequest) => {
    try {
        showLoading();
        const res: { statusCode: number; message: string } = await axiosInstance.post('/mom-chart', body);
        hideLoading();
        return res;
    } catch (error) {
        hideLoading();
        showCustomToast(error.message);
        console.log(error);
    }
};

export const createBabyCheckups = async (body: user.BabyCheckupsRequest) => {
    try {
        showLoading();
        const res: { statusCode: number; message: string } = await axiosInstance.post('/child-chart', body);
        showCustomToast('Thành công');
        hideLoading();
        return res;
    } catch (error) {
        hideLoading();
        showCustomToast('Thất bại');
        console.log(error);
    }
};

export const fetchMomCheckupsHistory = async () => {
    try {
        showLoading();
        const res: user.MomCheckupsResponse[] = await axiosInstance.get('/mom-chart');
        hideLoading();
        return res;
    } catch (error) {
        hideLoading();
        showCustomToast('Thất bại');
        console.log(error);
    }
};

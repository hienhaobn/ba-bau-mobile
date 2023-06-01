import { hideLoading, showLoading } from 'components/Loading';

import axiosInstance from 'services/api-requests';

import { showCustomToast } from 'utils/toast';

export const fetchPhotoPremium = async (gender: 'male' | 'female') => {
    try {
        // showLoading();
        const res: premium.PhotoPremiumResponse = await axiosInstance.get(`/image-children?page=1&size=100`, {
            params: {
                gender,
            },
        });
        // hideLoading();
        return res;
    } catch (error) {
        // hideLoading();
        showCustomToast(error?.response?.data?.message);
        console.log(error);
    }
};

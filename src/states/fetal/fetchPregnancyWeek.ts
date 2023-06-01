import { hideLoading, showLoading } from 'components/Loading';
import axiosInstance from 'services/api-requests';
import { showCustomToast } from 'utils/toast';

export const apiPregnancyWeekByWeek = async () => {
    try {
        const response: fetal.PostResponse = await axiosInstance.get('/posts?page=1&size=100');
        return response.posts;
    } catch (error) {
        console.log('apiPregnancyWeekByWeek: ', error);
        showCustomToast(error?.message);
    }
}

export const apiPregnancyById = async (id: string) => {
    try {
        showLoading();
        const response: fetal.Post = await axiosInstance.get(`/posts/${id}`);
        hideLoading();
        return response;
    } catch (error) {
        hideLoading();
        console.log('apiPregnancyById: ', error);
        showCustomToast(error?.message);
    }
}

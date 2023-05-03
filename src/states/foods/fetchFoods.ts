import { hideLoading, showLoading } from 'components/Loading';

import axiosInstance from 'services/api-requests';

import { showCustomToast } from 'utils/toast';

export const fetchFoodCategoryRoot = async () => {
    try {
        showLoading();
        const res: food.FoodCategoryRoot[] = await axiosInstance.get('/food-categories-root');
        hideLoading();
        return res;
    } catch (error) {
        hideLoading();
        showCustomToast('Thất bại');
        console.log(error);
    }
};

export const fetchFoodCategoryById = async (categoryById: string) =>  {
    try {
        showLoading();
        const res: food.FoodCategory[] = await axiosInstance.get(`/food-categories/root/${categoryById}`);
        hideLoading();
        return res;
    } catch (error) {
        hideLoading();
        showCustomToast(error?.response?.data?.message);
        console.log(error);
    }
}

export const fetchFoodsOfCategory = async (categoryId: string) => {
    try {
        showLoading();
        const res: food.FoodOfCategory[] = await axiosInstance.get(`/foods/category/${categoryId}`);
        hideLoading();
        return res;
    } catch (error) {
        hideLoading();
        showCustomToast('Thất bại');
        console.log(error);
    }
}

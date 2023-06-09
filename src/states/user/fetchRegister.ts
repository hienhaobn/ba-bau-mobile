import axios from 'axios';
import axiosInstance from 'services/api-requests';
import { showCustomToast } from 'utils/toast';

export const apiSendOtpRegister = async (user: user.SendOtpRegisterRequest) => {
    try {
        const res: { statusCode: number, message: string } = await axiosInstance.post('/accounts', user);
        if (res && res?.statusCode === 201) {
            showCustomToast(res?.message);
        }
        return res;
    } catch (error) {
        showCustomToast(error.message);
        console.log(error);
    }
};

export const apiRegister = async (user: user.ConfirmRegisterRequest) => {
    try {
        const response: { statusCode: number, message: string} = await axiosInstance.post('/accounts/confirm', {
            code: user.code,
            email: user.email,
        });
        if (response?.message) {
            showCustomToast(response?.message);
            return;
        }
        showCustomToast('Đăng ký thành công');
        return response;
    } catch (error) {
        showCustomToast(error.message);
        return;
    }
};


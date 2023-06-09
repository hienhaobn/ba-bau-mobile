import axiosInstance from 'services/api-requests';
import { showCustomToast } from 'utils/toast';

export const apiSendOtpForgotPassword = async (email: string) => {
    try {
        const response: { message: string; success: boolean } = await axiosInstance.post('/accounts/otp', { email });
        return response;
    } catch (error) {
        console.log(error);
        showCustomToast(error.response.data.message);
    }
};

const fetchForgotPassword = async (body: user.UserForgotPasswordRequest) => {
    try {
        await axiosInstance.post('/accounts/password', body);
        showCustomToast('Đổi mật khẩu thành công');
    } catch (error) {
        console.log(error);
        showCustomToast(error.response.data.message);
    }
};

import axiosInstance from 'services/api-requests';
import { showCustomToast } from 'utils/toast';

const fetchRegister = async (user: User.UserRegisterRequest) => {
    try {
        const res = await axiosInstance.post('/accounts', user);
        showCustomToast('Đăng ký thành công');
        return res;
    } catch (error) {
        showCustomToast(error.message);
        console.log(error);
    }
};

export default fetchRegister;

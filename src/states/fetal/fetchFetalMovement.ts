import moment from 'moment';
import { hideLoading, showLoading } from '../../components/Loading';
import { BASE_URL } from '../../configs/api';
import axiosInstance from '../../services/api-requests';
import { showCustomToast } from '../../utils/toast';

export const fetchMovementFromDateToDate = async (params: { from: Date, to: Date}) => {
    try {
        // showLoading();
        const fromDate = moment(params.from).format('DD/MM/YYYY');
        const toDate = moment(params.to).format('DD/MM/YYYY')
        const response: fetal.FetalResponse = await axiosInstance.get(`${BASE_URL}/fetal-movements?startDate=${fromDate}&endDate=${toDate}`);
        // hideLoading();
        return response.fetalMove;
    } catch (error) {
        // hideLoading();
        showCustomToast('Lấy dữ liệu thất bại')
        console.log(error);
    }
}

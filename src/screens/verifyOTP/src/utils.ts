import { navigate } from 'navigation/utils';

export const goToVerifyOTP = (email: string) => navigate('VerifyOTP', { email });

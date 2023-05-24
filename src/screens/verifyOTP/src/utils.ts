import { navigate } from 'navigation/utils';

export const goToVerifyOTP = (email: string, fromScreen: 'ForgotPassword' | 'Register', callbackSendOtp: () => { message: string; success: boolean }) => navigate('VerifyOTP', { email, fromScreen, callbackSendOtp });

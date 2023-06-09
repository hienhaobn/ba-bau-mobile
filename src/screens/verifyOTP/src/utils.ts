import { navigate } from 'navigation/utils';

export const goToVerifyOTP = (email: string, fromScreen: 'ForgotPassword' | 'Register', callbackSendOtp: () => { message: string; success: boolean }, password?: string) => navigate('VerifyOTP', { email, fromScreen, callbackSendOtp, password });

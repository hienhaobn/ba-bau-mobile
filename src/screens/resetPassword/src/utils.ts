import { navigate } from 'navigation/utils';

export const goToResetPassword = (email: string, otp: string) => navigate('ResetPassword', { email, otp });

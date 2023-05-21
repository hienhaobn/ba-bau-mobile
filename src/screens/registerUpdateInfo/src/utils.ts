import { navigate } from 'navigation/utils';

export const goToRegisterUpdateInfo = (email: string, password: string) => navigate('RegisterUpdateInfo', { email, password });

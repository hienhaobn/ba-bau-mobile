import { navigate } from 'navigation/utils';

export const goToHistoryFetus = () => navigate('HistoryFetus');

export const goToAddHistoryFetus = (action: 'CREATE' | 'EDIT', history?: fetal.FetalHistory) => navigate('AddHistoryFetus', { action, history });

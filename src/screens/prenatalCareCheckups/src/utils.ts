import { navigate } from 'navigation/utils';

export const goToPrenatalCareCheckups = () => navigate('PrenatalCareCheckups');

export const goToRoutineCheckups = () => navigate('RoutineCheckups');

export const goToPrenatalCareCheckupsChartMom = () => navigate('PrenatalCareCheckupsChartMom');

export const goToAddPrenatalCareCheckupsStep1 = () => navigate('AddPrenatalCareCheckupsStep1');

export const goToAddPrenatalCareCheckupsStep2 = (weeksOfPregnacy: string) => navigate('AddPrenatalCareCheckupsStep2', { weeksOfPregnacy });

export const goToPrenatalCareCheckupsItemHistory = () => navigate('PrenatalCareCheckupsItemHistory');

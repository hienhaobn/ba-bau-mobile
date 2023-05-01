import { navigate } from 'navigation/utils';

export const goToPrenatalCareCheckups = () => navigate('PrenatalCareCheckups');

export const goToRoutineCheckups = () => navigate('RoutineCheckups');

export const goToPrenatalCareCheckupsChartMom = () => navigate('PrenatalCareCheckupsChartMom');

export const goToAddPrenatalCareCheckupsStep1 = () => navigate('AddPrenatalCareCheckupsStep1');

export const goToAddPrenatalCareCheckupsStep2 = (momCheckups: user.MomCheckupsRequest) => navigate('AddPrenatalCareCheckupsStep2', { momCheckups });

export const goToPrenatalCareCheckupsItemHistory = (child: user.CheckupsScheduleChildResponse, momId: user.CheckupsScheduleMomResponse) => navigate('PrenatalCareCheckupsItemHistory', { child, momId });

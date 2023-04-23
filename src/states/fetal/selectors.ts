import { createSelector } from '@reduxjs/toolkit';

import { GlobalState } from 'states/types';

const selectLoadingMovementCreated = (state: GlobalState) => {
    return state.fetal.loadingCreated;
};

export const useLoadingMovementCreatedSelector = createSelector(
    [selectLoadingMovementCreated],
    (loadingCreated) => loadingCreated
);

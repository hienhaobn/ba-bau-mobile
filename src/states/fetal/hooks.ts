import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'states';
import { fetchFetalDevelopmentWeekly, fetchMovementByDateNow } from 'states/fetal/index';
import { selectDueDate, selectFetalDevelopmentWeekly, selectFetalMovements, selectIsLoading } from 'states/fetal/selectors';

export const useFetchMovementByDateNow = (date: Date) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchMovementByDateNow(date));
    }, [dispatch, date]);
};

export const useFetchFetalDevelopmentWeekly = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchFetalDevelopmentWeekly());
    }, [dispatch]);
};

export const useMovementSelector = () => {
    return useSelector(selectFetalMovements);
};

export const useMovementsIsLoadingSelector = () => {
    return useSelector(selectIsLoading);
};

export const useDueDateSelector = () => {
    return useSelector(selectDueDate);
};

export const useFetalDevelopmentWeeklySelector = () => {
    return useSelector(selectFetalDevelopmentWeekly);
};

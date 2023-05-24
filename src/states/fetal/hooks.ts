import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from 'states';
import { fetchMovementByDateNow } from 'states/fetal/index';
import { selectDueDate, selectFetalMovements, selectIsLoading } from 'states/fetal/selectors';

export const useFetchMovementByDateNow = (date: Date) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchMovementByDateNow(date));
    }, [dispatch, date]);
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

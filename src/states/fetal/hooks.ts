import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'states';
import { fetchMovementByDateNow, fetchMovementFromDateToDate } from 'states/fetal/index';
import { selectIsLoading, selectFetalMovements } from 'states/fetal/selectors';

export const useFetchMovementByDateNow = (date: Date) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchMovementByDateNow(date));
    }, [dispatch, date]);
};

export const useFetchMovementFromDateToDate = (prams: { from: Date, to: Date }) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchMovementFromDateToDate(prams));
    }, [dispatch, prams.from, prams.to]);
};

export const useMovementSelector = () => {
    return useSelector(selectFetalMovements);
};

export const useMovementsIsLoadingSelector = () => {
    return useSelector(selectIsLoading)
}

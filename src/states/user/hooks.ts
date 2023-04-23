import { useEffect } from 'react';

import { fetchLogin, fetchRegister } from '.';

import { useAppDispatch } from 'states';

export const useFetchLogin = (user: User.UserLoginRequest) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchLogin(user));
    }, [dispatch]);
};

export const useFetchRegister = (user: User.UserRegisterRequest) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchRegister(user));
    }, [dispatch]);
};

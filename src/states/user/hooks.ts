import { useEffect } from 'react';

import { fetchLogin } from '.';

import { useAppDispatch } from 'states';

export const useFetchLogin = (user: user.UserLoginRequest) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchLogin(user));
    }, [dispatch]);
};

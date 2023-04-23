import { useEffect } from 'react';

import { fetchLogin } from '.';

import { useAppDispatch } from 'states';

export const useFetchLogin = (user: User.UserLoginRequest) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchLogin(user));
    }, [dispatch]);
};

import { useEffect } from 'react';

import { fetchLogin, fetchRegister } from '.';

import { useAppDispatch } from 'states';

export const useFetchLogin = (user: User.UserLoginRequest) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchLogin(user));
    }, [dispatch]);
};

// export const useFetchRegister = () => {
//     // const dispatch = useAppDispatch();
//     console.log('useFetchRegister0')
//     // dispatch(fetchRegister(user));
//     useEffect(() => {
//         console.log('useFetchRegister')
//         // dispatch(fetchRegister(user));
//     }, []);
// };

export const useFetchRegister = (user: User.UserRegisterRequest) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchRegister(user));
    }, [dispatch]);
};

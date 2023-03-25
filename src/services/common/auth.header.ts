import { useSelector } from 'react-redux';

import { RootState } from 'states';

export default function authHeader() {
    const user = useSelector((state: RootState) => state.user);

    if (user && user.jwt) {
        return {
            Authorization: 'Bearer ' + user.jwt,
        };
    } else {
        return {};
    }
}

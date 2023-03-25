declare namespace User {
    type State = Readonly<Info>;

    interface Info {
        isLogin: boolean;
        jwt: string;
        profile: string;
    }

    interface Profile {
        _id: sting;
    }

    interface UserLogin {
        _id: string;
        email: string;
        role: string;
        jwt: string;
    }
}

declare namespace user {
    type State = Readonly<Info>;

    interface Info {
        isLogin: boolean;
        jwt: string;
        profile: string;
    }

    interface Profile {
        _id: sting;
    }

    interface UserLoginRequest {
        email: string;
        password: string;
    }

    interface UserLoginResponse {
        _id: string;
        email: string;
        role: string;
        jwt: string;
    }

    interface UserRegisterRequest {
        email: string;
        password: string;
        phone: string;
    }

    interface VerifyOTPRoute {
        email: string;
        fromScreen?: 'ForgotPassword' | 'Register';
    }

    interface UserForgotPasswordRequest {
        email: string;
        otp: string;
        password: string;
    }
}

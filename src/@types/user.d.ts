declare namespace user {
    type State = Readonly<Info>;

    interface Info {
        isLogin: boolean;
        jwt: string;
        profile: Profile;
    }

    interface Profile {
        _id: string;
        email: string;
        phone: string;
        balance: number;
        activated: string;
        fullname: string;
        role: string;
        address: string;
        childBirthday: string;
        lastMenstrualPeriod: string;
        avatar: string;
        birthday: string;
        childName: string;
        createdAt: string;
        updatedAt: string;
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

    interface SendOtpRegisterRequest {
        email: string;
        password: string;
        phone: string;
    }

    interface ConfirmRegisterRequest {
        code: string;
        email: string;
    }

    interface VerifyOTPRoute {
        email: string;
        fromScreen?: 'ForgotPassword' | 'Register';
        callbackSendOtp: () => { message: string; success: boolean };
        password?: string;
    }

    interface UserForgotPasswordRequest {
        email: string;
        otp: string;
        password: string;
    }

    interface MomCheckupsRequest {
        weight: number;
        weeksOfPregnacy: string;
        bloodPressure: number;
        fastingGlycemicIndex: number;
        eating1hGlycemicIndex: number;
        eating2hGlycemicIndex: number;
        note: string;
        commonDiseases: string;
        pregnancyExam: Date;
    }

    interface MomCheckupsResponse {
        _id: string;
        weight: number;
        weeksOfPregnacy: string;
        bloodPressure: number;
        fastingGlycemicIndex: number;
        eating1hGlycemicIndex: number;
        eating2hGlycemicIndex: number;
        note: string;
        commonDiseases: string;
        pregnancyExam: string;
        idAccount: string;
        createdAt: string;
        updatedAt: string;
    }

    interface BabyCheckupsRequest {
        weight: number;
        weeksOfPregnacy: string;
        dualTopDiameter: number;
        femurLength: number;
        headPerimeter: number;
        width: number;
        note: string;
        pregnancyExam: Date;
    }

    interface CheckupsScheduleRequest {
        momData: MomCheckupsRequest;
        childData: BabyCheckupsRequest;
    }

    interface CheckupsScheduleMomResponse {
        _id: string;
        weight: number;
        weeksOfPregnacy: string;
        bloodPressure: number;
        fastingGlycemicIndex: number;
        eating1hGlycemicIndex: number;
        eating2hGlycemicIndex: number;
        note: string;
        commonDiseases: string;
        pregnancyExam: string;
        idAccount: string;
        createdAt: string;
        updatedAt: string;
    }

    interface FetalDevelopmentWeeklyItem {
        min: number;
        max: number;
    }

    interface FetalDevelopmentWeekly {
        AC: FetalDevelopmentWeeklyItem;
        BPD: FetalDevelopmentWeeklyItem;
        CRL: FetalDevelopmentWeeklyItem;
        FL: FetalDevelopmentWeeklyItem;
        GSD: FetalDevelopmentWeeklyItem;
        HC: FetalDevelopmentWeeklyItem;
        createdAt: string;
        updatedAt: string;
        week: string;
    }

    interface CheckupsScheduleChildResponse {
        _id: string;
        weight: number;
        weeksOfPregnacy: string;
        dualTopDiameter: number;
        femurLength: number;
        headPerimeter: number;
        note: string;
        idAccount: string;
        momId: CheckupsScheduleMomResponse;
        createdAt: string;
        updatedAt: string;
        width: number;
        pregnancyExam: string;
        fetalDevelopmentWeekly: FetalDevelopmentWeekly;
    }

    interface CheckupsScheduleHistoryResponse {
        data: {
            child: CheckupsScheduleChildResponse;
            momId: CheckupsScheduleMomResponse;
        }[];
    }
}

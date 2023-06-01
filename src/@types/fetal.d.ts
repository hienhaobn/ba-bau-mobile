declare namespace fetal {
    type State = Readonly<Info>;

    interface FetalMovement {
        date: string;
        timeStart: string;
        timeCount: string;
        count: number;
        idUser: string;
        _id: string;
    }

    interface FetalResponse {
        count: number;
        current_page: number;
        fetalMove: FetalMovement[];
        total_page: number;
    }

    interface Info {
        data: FetalResponse;
        isLoading: boolean;
        dueDate: string;
        fetalDevelopmentWeekly: FetalDevelopmentWeeklyResponse;
    }

    interface FetalHistory {
        _id: string;
        image: string;
        note: string;
        weeksOfPregnancy: string;
        idAccount: string;
        datePhoto: string;
        createdAt: string;
        updatedAt: string;
    }

    interface FetalHistoryResponse {
        current_page: number,
        total_page: number,
        count: number,
        babyDiaries: FetalHistory[]
    }

    interface FetalDevelopmentWeeklyResponse {
        current_page: string;
        total_page: number;
        count: number;
        vifetalDevelopmentWeekliesdeos: FetalDevelopmentWeekly[];
        createdAt: string;
        updatedAt: string;
    }

    interface FetalDevelopmentWeekly {
        week: number
        GSD: Gsd
        CRL: Crl
        BPD: Bpd
        FL: Fl
        HC: Hc
        AC: Ac
        createdAt: string
        updatedAt: string
    }

    interface Gsd {
        min: number
        max: number
    }

    interface Crl {
        min: number
        max: number
    }

    interface Bpd {
        min: number
        max: number
    }

    interface Fl {
        min: number
        max: number
    }

    interface Hc {
        min: number
        max: number
    }

    interface Ac {
        min: number
        max: number
    }

    interface Post {
        content: string;
        _id: string;
        week: number;
        image: string;
        contentBaby: string;
        contentchangeMom: string;
        contentAdvice: string;
        createdAt: string;
        updatedAt: string;
    }

    interface PostResponse {
        current_page: string;
        total_page: number;
        count: number;
        posts: Post[];
        createdAt: string;
        updatedAt: string;
    }
}

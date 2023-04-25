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
    }

}

declare namespace fetal {
    type State = Readonly<Info>;

    interface IMovement {
        date: string;
        timeStart: string;
        timeCount: string;
        count: number;
        idUser: string;
        _id: string;
    }

    interface Info {
        movements: IMovement[];
        loadingCreated: boolean;
    }

}

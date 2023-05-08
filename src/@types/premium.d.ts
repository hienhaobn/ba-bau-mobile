declare namespace premium {
    interface Story {
        _id: string;
        title: string;
        image: string;
        content: string;
        createdAt: string;
        updatedAt: string;
    }

    interface PhotoPremium {
        createdAt: string;
        gender: string;
        link: string;
        updatedAt: string;
        _id: string;
    }

    interface VideoPremium {
        createdAt: string;
        link: string;
        title: string;
        updatedAt: string;
        _id: string;
    }

    interface MusicPremium {
        audio: string;
        createdAt: string;
        image: string;
        name: string;
        threeMonth: string;
        updatedAt: string;
        _id: string;
    }
}

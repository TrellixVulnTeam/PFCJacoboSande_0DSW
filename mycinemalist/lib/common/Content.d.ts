import 'moment/locale/es';
export declare class Content {
    id: number;
    year: number;
    title: string;
    sinopsis: string;
    platform: string;
    director: string;
    leading_cast: string;
    genre: string;
    contentType: string;
    image: string;
    rating: number;
    isFav: boolean;
    constructor(Item: any, isFav: boolean);
}

import 'moment/locale/es';
import { Moment, now } from 'moment';
import commonStyles from './common.module.scss';
import * as moment from 'moment';



export class Comment {
    public id: number;
    public content_id: number;
    public user_id: number;
    public comment: string;
    public rating: number;



    constructor(Item: any) {

        this.id = Item.id = ! null ? Item.id : 0;
        this.content_id = Item.content_id = ! null ? Item.content_id : 0;
        this.user_id = Item.user_id = ! null ? Item.user_id : 0;
        this.comment = Item.comment = ! null ? Item.comment : "";
        this.rating = Item.rating = ! null ? Item.rating : 0;

    }


}



import 'moment/locale/es';
import { Moment, now } from 'moment';
import commonStyles from './common.module.scss';
import * as moment from 'moment';



export class Suggestion {
    public id: number;
    public year: number;
    public title: string;
    public platform: string;



    constructor(Item: any) {

        this.id = Item.id = ! null ? Item.id : 0;
        this.year = Item.year = ! null ? Item.year : 0;
        this.title = Item.title = ! null ? Item.title : "";
        this.platform = Item.platform = ! null ? Item.platform : "";


    }


}



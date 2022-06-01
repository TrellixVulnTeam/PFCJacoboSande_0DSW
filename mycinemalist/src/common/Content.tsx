import 'moment/locale/es';
import { Moment, now } from 'moment';
import commonStyles from '../common/common.module.scss';
import * as moment from 'moment';



export class Content {
    public id: number;
    public year: number;
    public title: string;
    public sinopsis: string;
    public platform: string;
    public director: string;
    public leading_cast: string;
    public genre: string;
    public content_type: string;
    public image: string;
    public rating: number;
    public isFav:boolean;

    constructor(Item: any,isFav:boolean) {
        this.id = Item.id = ! null ? Item.id : 0;
        this.year = Item.year = ! null ? Item.year : 0;
        this.title = Item.title = ! null ? Item.title : "";
        this.sinopsis = Item.sinopsis = ! null ? Item.sinopsis : "";
        this.platform = Item.platform = ! null ? Item.platform : "";
        this.director = Item.director = ! null ? Item.director : "";
        this.leading_cast = Item.leading_cast = ! null ? Item.leading_cast : "";
        this.genre = Item.genre = ! null ? Item.genre : "";
        this.content_type = Item.content_type = ! null ? Item.content_type : "";
        this.image = Item.image = ! null ? Item.image : "";
        this.rating = Item.rating = ! null ? Item.rating : "";
        this.isFav = isFav?true:false;
    }
}



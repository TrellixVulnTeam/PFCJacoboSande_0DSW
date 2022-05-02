import 'moment/locale/es';
import { Moment, now } from 'moment';
import commonStyles from '../common/common.module.scss';
import * as moment from 'moment';



export class User {
    public name : string;
    public surname :string;
    public email : string;
    public id : number;
    public isAdmin : boolean;
    public description :string;
    public profileImage : string;
    

    constructor(Item: any) {
            this.name = Item.name=! null? Item.name : "";
            this.surname = Item.surname=! null? Item.surname : "";
            this.email = Item.email=! null? Item.email : "";
            this.id = Item.id=! null? Item.id : 0;
            this.isAdmin = Item.isAdmin=! null? Item.isAdmin : false;
            this.description = Item.description=! null? Item.description : "";
            this.profileImage = Item.profileImage=! null? Item.profileImage : "";
        }
    }



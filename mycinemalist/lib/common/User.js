import 'moment/locale/es';
var User = /** @class */ (function () {
    function User(Item) {
        this.name = Item.name = !null ? Item.name : "";
        this.surname = Item.surname = !null ? Item.surname : "";
        this.email = Item.email = !null ? Item.email : "";
        this.id = Item.id = !null ? Item.id : 0;
        this.isAdmin = Item.isAdmin = !null ? Item.isAdmin : false;
        this.description = Item.description = !null ? Item.description : "";
        this.profileImage = Item.profileImage = !null ? Item.profileImage : "";
    }
    return User;
}());
export { User };
//# sourceMappingURL=User.js.map
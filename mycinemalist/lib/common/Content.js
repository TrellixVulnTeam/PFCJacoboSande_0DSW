import 'moment/locale/es';
var Content = /** @class */ (function () {
    function Content(Item) {
        this.id = Item.id = !null ? Item.id : 0;
        this.year = Item.year = !null ? Item.year : 0;
        this.title = Item.title = !null ? Item.title : "";
        this.sinopsis = Item.sinopsis = !null ? Item.sinopsis : "";
        this.platform = Item.platform = !null ? Item.platform : "";
        this.director = Item.director = !null ? Item.director : "";
        this.leading_cast = Item.leading_cast = !null ? Item.leading_cast : "";
        this.genre = Item.genre = !null ? Item.genre : "";
        this.contentType = Item.contentType = !null ? Item.contentType : "";
        this.image = Item.image = !null ? Item.image : "";
        this.rating = Item.rating = !null ? Item.rating : "";
    }
    return Content;
}());
export { Content };
//# sourceMappingURL=Content.js.map
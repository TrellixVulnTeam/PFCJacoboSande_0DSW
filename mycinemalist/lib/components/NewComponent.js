var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React from "react";
import { initializeIcons, } from "office-ui-fabric-react";
import 'datatables.net';
import 'datatables.net-responsive';
import 'datatables.net-buttons';
import 'datatables.net-select';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
var ListaContent = /** @class */ (function (_super) {
    __extends(ListaContent, _super);
    function ListaContent(props, state) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        initializeIcons();
        return _this;
    }
    ListaContent.prototype.componentDidMount = function () {
    };
    ListaContent.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) { };
    ListaContent.prototype.render = function () {
        return (React.createElement("h2", null, "hola"));
    };
    return ListaContent;
}(React.Component));
export default ListaContent;
//# sourceMappingURL=NewComponent.js.map
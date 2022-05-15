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
import { Stack, initializeIcons, } from "office-ui-fabric-react";
import 'datatables.net';
import 'datatables.net-responsive';
import 'datatables.net-buttons';
import 'datatables.net-select';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
var ContentCard = /** @class */ (function (_super) {
    __extends(ContentCard, _super);
    function ContentCard(props, state) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        initializeIcons();
        return _this;
    }
    ContentCard.prototype.componentDidMount = function () {
        console.log();
    };
    ContentCard.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) { };
    ContentCard.prototype.render = function () {
        return (React.createElement("div", { style: { width: "23%", display: "flex", border: "1px solid black", padding: "10px", margin: "10px" } },
            React.createElement("img", { style: { maxWidth: "45%", objectFit: "cover" }, src: this.props.item.image, alt: "" }),
            React.createElement(Stack, { style: { maxWidth: "50%" } },
                React.createElement("span", null, this.props.item.title),
                React.createElement("span", null, this.props.item.genre),
                React.createElement("span", null, this.props.item.year),
                React.createElement("span", null, this.props.item.platform))));
    };
    return ContentCard;
}(React.Component));
export default ContentCard;
//# sourceMappingURL=ContentCard.js.map
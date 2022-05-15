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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from "react";
import { DefaultButton, PersonaSize, Persona, } from "office-ui-fabric-react";
import "moment/locale/es";
import { TestImages } from "@fluentui/example-data";
var filterIcon = { iconName: "Filter" };
var filterSolidIcon = { iconName: "FilterSolid" };
var addIcon = { iconName: "Add" };
var examplePersona = {
    imageUrl: TestImages.personaFemale,
    imageInitials: 'AL',
    text: 'Annie Lindqvist',
};
var ContextualCliente = /** @class */ (function (_super) {
    __extends(ContextualCliente, _super);
    function ContextualCliente(props, state) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    ContextualCliente.prototype.render = function () {
        var _this = this;
        var MenuProps = {
            items: [
                {
                    key: "Configuracion",
                    text: "Configuración",
                    iconProps: { iconName: "Settings" },
                    onClick: function () {
                        _this.props.nuevaBolsa();
                    }
                },
                {
                    key: "Logout",
                    text: "Logout",
                    iconProps: { iconName: "UserRemove" },
                    onClick: function () {
                        _this.props.nuevoRegistro();
                    }
                },
            ],
        };
        return (React.createElement(DefaultButton
        // text="Nuevo"
        // iconProps={addIcon}
        , { 
            // text="Nuevo"
            // iconProps={addIcon}
            menuProps: MenuProps, 
            // onMenuClick={_onMenuClick}
            // By default, the ContextualMenu is re-created each time it's shown and destroyed when closed.
            // Uncomment the next line to hide the ContextualMenu but persist it in the DOM instead.
            // persistMenu={true}
            allowDisabledFocus: true },
            React.createElement(Persona, __assign({}, examplePersona, { text: "Annie Lindqvist", size: PersonaSize.size32, hidePersonaDetails: false, imageAlt: "Annie Lindqvist, status is online" }))));
    };
    return ContextualCliente;
}(React.Component));
export { ContextualCliente };
//# sourceMappingURL=Helper.js.map
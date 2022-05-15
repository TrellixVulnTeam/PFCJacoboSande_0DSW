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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import ListaContent from "./components/ListaContent";
import { Content } from './common/Content';
import LoginRegister from './components/LoginRegister';
import { Stack } from 'office-ui-fabric-react';
import { ContextualCliente } from './common/Helper';
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props, state) {
        var _this = _super.call(this, props) || this;
        _this.dataContent = {};
        _this.state = {
            isDataLoaded: false,
            isUserLogged: true,
        };
        return _this;
    }
    App.prototype.componentDidMount = function () {
        console.log("se monto la app y la gozadera tambien");
        this.initContent();
    };
    App.prototype.initContent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var content, favs, contenido, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("init");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fetch("http://localhost:8080/getAllContent.php", {
                                mode: "cors",
                            })];
                    case 2:
                        contenido = _a.sent();
                        return [4 /*yield*/, contenido.json()];
                    case 3:
                        // const favoritos = await fetch(`http://localhost:8080/getAllFavs.php`, {
                        //   mode: "cors",
                        // });
                        content = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 5];
                    case 5:
                        content.map(function (item) {
                            var content = new Content(item, true);
                            _this.dataContent[content.title] = content;
                            return true;
                        });
                        console.log(content);
                        this.setState({ isDataLoaded: true });
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.loggedUser = function (userLogged) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    App.prototype.render = function () {
        return (React.createElement(Router, null,
            React.createElement("div", { className: "container mt-5" },
                this.state.isUserLogged &&
                    React.createElement(React.Fragment, null,
                        React.createElement(Stack, { horizontal: true, horizontalAlign: 'space-between' },
                            React.createElement("div", { className: "btn-group" },
                                React.createElement(Link, { to: "/listaContent", className: "btn btn-dark me-2 border border-3 border-white rounded mt-2" }, "Inicio"),
                                React.createElement(Link, { to: "/favorites", className: "btn btn-dark me-2 border border-3 border-white rounded mt-2" }, "Mis favoritos"),
                                React.createElement(Link, { to: "/suggestion", className: "btn btn-dark me-2 border border-3 border-white rounded mt-2" }, "Sugerir")),
                            React.createElement(Stack, null,
                                React.createElement(ContextualCliente, { nuevaBolsa: function () {
                                        // this.CrearEditarBolsa();
                                    }, nuevoRegistro: function () {
                                        // this.CrearEditarRegistro(null);
                                    } }))),
                        React.createElement("hr", null)),
                React.createElement(Routes, null,
                    React.createElement(Route, { path: "/", element: React.createElement(LoginRegister, { submit: this.loggedUser.bind(this) }) }),
                    this.state.isDataLoaded ? (React.createElement(Route, { path: "/listaContent", element: React.createElement(ListaContent, { dataContent: this.dataContent }) })) : (React.createElement(React.Fragment, null))))));
    };
    return App;
}(React.Component));
export default App;
//# sourceMappingURL=App.js.map
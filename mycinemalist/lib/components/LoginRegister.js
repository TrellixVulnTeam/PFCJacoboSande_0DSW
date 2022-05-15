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
import React from "react";
import commonStyles from "../common/common.module.scss";
import { Helmet } from "react-helmet";
import logo from '../images/logoproject.png'; // with import
import { Stack, PrimaryButton, TextField, Label, initializeIcons, Toggle, } from "office-ui-fabric-react";
import 'datatables.net';
import 'datatables.net-responsive';
import 'datatables.net-buttons';
import 'datatables.net-select';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { Button, CircularProgress } from "@material-ui/core";
var showErrors = false;
var LoginRegister = /** @class */ (function (_super) {
    __extends(LoginRegister, _super);
    function LoginRegister(props, state) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            email: "",
            loggin: true,
            password: "",
            confpassword: "",
            name: "",
            loadingCambio: false,
            surname: "",
            description: "",
            errorName: "",
            errorSurname: "",
            errorDesc: "",
            errorPass: "",
            errorEmail: "",
            errorConf: "",
        };
        initializeIcons();
        return _this;
    }
    LoginRegister.prototype.checkForm = function (submit) {
        var allOK = true;
        if (showErrors) {
            this.state.name.trim()
                ? this.setState({ errorName: "" })
                : (this.setState({ errorName: "Rellene este campo" }),
                    (allOK = false));
            if (this.state.name.trim()) {
                this.setState({ errorName: "" });
            }
            else {
                this.setState({ errorName: "Rellene este campo" });
                allOK = false;
            }
            this.state.surname.trim()
                ? this.setState({ errorSurname: "" })
                : (this.setState({ errorSurname: "Rellene este campo" }),
                    (allOK = false));
            this.state.description.trim()
                ? this.setState({ errorDesc: "" })
                : (this.setState({ errorDesc: "Rellene este campo" }),
                    (allOK = false));
            this.state.password.trim()
                ? this.setState({ errorPass: "" })
                : (this.setState({ errorPass: "Rellene este campo" }),
                    (allOK = false));
            this.state.password != this.state.confpassword
                ? this.setState({ errorConf: "" })
                : (this.setState({ errorConf: "Las contraseñas no coinciden" }),
                    (allOK = false));
            this.state.email.trim()
                ? this.setState({ errorEmail: "" })
                : (this.setState({ errorEmail: "Rellene este campo" }),
                    (allOK = false));
        }
        if (submit) {
            return allOK;
        }
    };
    LoginRegister.prototype.componentDidMount = function () {
        showErrors = false;
    };
    LoginRegister.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) {
        var _this = this;
        if (this.state.loadingCambio) {
            setTimeout(function () {
                _this.setState({
                    loggin: !_this.state.loggin,
                    loadingCambio: false
                });
            }, 1000);
        }
        if (prevState.name != this.state.name ||
            prevState.surname != this.state.surname ||
            prevState.description != this.state.description ||
            prevState.password != this.state.password ||
            prevState.confpassword != this.state.confpassword ||
            prevState.email != this.state.email) {
            this.checkForm(false);
        }
    };
    LoginRegister.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: commonStyles.logginRgister },
            React.createElement(Helmet, null,
                React.createElement("style", null, 'body { background-color: #ccc; }')),
            React.createElement(Stack, { style: { marginTop: "10%" }, horizontalAlign: "center" },
                React.createElement(Stack, { id: "logoEmpresa", style: {} },
                    React.createElement("img", { style: {
                            objectFit: "cover",
                            maxWidth: "335px"
                        }, src: logo })),
                this.state.loadingCambio ? (React.createElement("div", { className: commonStyles.formLoggin, style: { minHeight: "400px", padding: "150px" } },
                    React.createElement(CircularProgress, { color: "inherit", size: "200px" }))) : (React.createElement(React.Fragment, null,
                    this.state.loggin &&
                        React.createElement(React.Fragment, null,
                            React.createElement(Stack, { padding: 10, horizontal: true, horizontalAlign: "center", style: { width: "100%" }, tokens: { childrenGap: 10 } },
                                React.createElement("div", { className: commonStyles.formLoggin },
                                    React.createElement(TextField, { label: "Email", onChange: function (ev, email) {
                                            _this.setState({ email: email });
                                        }, value: this.state.email ? this.state.email : "", required: true, autoAdjustHeight: true }),
                                    React.createElement(TextField, { label: "Contrase\u00F1a", type: "password", onChange: function (ev, password) {
                                            _this.setState({ password: password });
                                        }, required: true, value: this.state.password ? this.state.password : "", canRevealPassword: true }),
                                    React.createElement(Stack, { tokens: { childrenGap: 10 }, grow: 1, horizontal: true, horizontalAlign: "center" },
                                        React.createElement(PrimaryButton, { style: {
                                                margin: "20px auto"
                                            }, text: "Iniciar sesi\u00F3n", onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    return [2 /*return*/];
                                                });
                                            }); }, allowDisabledFocus: true }))))),
                    !this.state.loggin &&
                        React.createElement(React.Fragment, null,
                            React.createElement(Stack, { padding: 10, horizontal: true, horizontalAlign: "center", style: { width: "100%" }, tokens: { childrenGap: 10 } },
                                React.createElement("div", { className: commonStyles.formLoggin },
                                    React.createElement(TextField, { label: "Nombre", onChange: function (ev, name) {
                                            _this.setState({ name: name });
                                        }, value: this.state.name ? this.state.name : "", required: true, autoAdjustHeight: true }),
                                    React.createElement(TextField, { label: "Apellidos", onChange: function (ev, surname) {
                                            _this.setState({ surname: surname });
                                        }, value: this.state.surname ? this.state.surname : "", required: true, autoAdjustHeight: true }),
                                    React.createElement(TextField, { label: "Descripcion", onChange: function (ev, description) {
                                            _this.setState({
                                                description: description,
                                            });
                                        }, value: this.state.description ? this.state.description : "", multiline: true, autoAdjustHeight: true }),
                                    React.createElement(Label, null, "Imagen de perfil"),
                                    React.createElement(Button, { variant: "contained", component: "label", style: { margin: "1px" } },
                                        React.createElement("input", { type: "file", style: { padding: "10px" } })),
                                    React.createElement(TextField, { label: "Email", onChange: function (ev, email) {
                                            _this.setState({ email: email });
                                        }, value: this.state.email ? this.state.email : "", required: true, autoAdjustHeight: true }),
                                    React.createElement("span", { className: commonStyles.errorSpan, style: { display: this.state.errorEmail ? "block" : "none" } }, this.state.errorEmail),
                                    React.createElement(TextField, { label: "Contrase\u00F1a", type: "password", required: true, onChange: function (ev, password) {
                                            _this.setState({ password: password });
                                        }, value: this.state.password ? this.state.password : "", canRevealPassword: true }),
                                    React.createElement(TextField, { label: "Confirmar contrase\u00F1a", type: "password", required: true, onChange: function (ev, confpassword) {
                                            _this.setState({ confpassword: confpassword });
                                        }, value: this.state.confpassword ? this.state.confpassword : "", canRevealPassword: true }),
                                    React.createElement(Stack, { tokens: { childrenGap: 10 }, grow: 1, style: {
                                            margin: "20px auto"
                                        }, horizontal: true, horizontalAlign: "center" },
                                        React.createElement(PrimaryButton, { text: "Registrarse", onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    showErrors = true;
                                                    if (this.checkForm(true)) {
                                                    }
                                                    return [2 /*return*/];
                                                });
                                            }); }, allowDisabledFocus: true }))))))),
                React.createElement(Stack, { horizontal: true, horizontalAlign: "space-between" },
                    React.createElement(Label, null, "Registro"),
                    React.createElement(Toggle, { style: { margin: "20px", marginTop: "7px" }, label: "", defaultChecked: true, onText: "", offText: "", onChange: function (ev, checked) {
                            _this.setState({ loadingCambio: true });
                        } }),
                    React.createElement(Label, null, "Inicio sesi\u00F3n")))));
    };
    return LoginRegister;
}(React.Component));
export default LoginRegister;
//# sourceMappingURL=LoginRegister.js.map
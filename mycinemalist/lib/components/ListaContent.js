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
import { Content } from "../common/Content";
import * as $ from 'jquery';
var ListaContent = /** @class */ (function (_super) {
    __extends(ListaContent, _super);
    function ListaContent(props, state) {
        var _this = _super.call(this, props) || this;
        _this.dataContent = {};
        _this.state = {
            isDataLoaded: false,
        };
        return _this;
    }
    ListaContent.prototype.componentDidMount = function () {
        var _this = this;
        this.props.dataFromParent.map(function (item) {
            var content = new Content(item);
            _this.dataContent[content.title] = content;
        });
        this.getUser();
        this.initContent();
        this.mountTableContent();
    };
    ListaContent.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) { };
    ListaContent.prototype.getUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var usuario;
            return __generator(this, function (_a) {
                return [2 /*return*/, usuario];
            });
        });
    };
    ListaContent.prototype.initContent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var content, respuesta, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, fetch("http://localhost:8080/getAllContent.php", {
                                mode: "cors",
                            })];
                    case 1:
                        respuesta = _a.sent();
                        return [4 /*yield*/, respuesta.json()];
                    case 2:
                        content = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 4];
                    case 4:
                        content.map(function (item) {
                            var content = new Content(item);
                            _this.dataContent[content.title] = content;
                        });
                        console.log(content);
                        // this.fillContentTable();
                        this.setState({ isDataLoaded: true });
                        this.fillTableContent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ListaContent.prototype.fillTableContent = function () {
        var contentRow = [];
        $.each(this.dataContent, function (_idx, listItem) {
            contentRow.push([
                listItem.id,
                "<span title='".concat(listItem.title, "'>").concat(listItem.title, "<span>"),
                "<span title='".concat(listItem.platform, "'>").concat(listItem.platform, "<span>"),
                "<span title='".concat(listItem.genre, "'>").concat(listItem.genre, "<span>"),
                "<span title='".concat(listItem.year, "'>").concat(listItem.year, "<span>"),
                "<span title='".concat(listItem.rating, "'>").concat(listItem.rating, "<span>"),
                "<span title='favorito'><span>",
                "",
            ]);
        });
        console.log(contentRow);
        this.tableContent.rows.add(contentRow).draw();
        this.tableContent.draw();
        this.tableContent.responsive.recalc();
        this.tableContent.columns.adjust().draw();
    };
    ListaContent.prototype.geticonoSiguiente = function () {
        return "<span class='icoSiguiente'><span/>";
        // return <ArrowForwardIosIcon />;
    };
    ListaContent.prototype.geticonoAnterior = function () {
        return "<span class='icoAnterior'><span/>";
        // return `<i class="${getIconClassName("ChevronLeftSmall")}" />`;
        // return <ArrowBackIosIcon />;
    };
    ListaContent.prototype.mountTableContent = function () {
        var _this = this;
        var siguiente = this.geticonoSiguiente();
        var anterior = this.geticonoAnterior();
        // Meter iconos de material ui
        // this.renderIcons();
        $.extend($.fn.dataTable.defaults, {
            responsive: true,
        });
        $.extend($.fn.dataTableExt.oSort, {
            "date-eu-asc": function (a, b) {
                if (a == "")
                    return 1;
                else if (b == "")
                    return -1;
                else {
                    var aDay = a.split("/")[0];
                    var aMonth = a.split("/")[1];
                    var aYear = a.split("/")[2];
                    a = new Date(aMonth + "/" + aDay + "/" + aYear).getTime();
                    var bDay = b.split("/")[0];
                    var bMonth = b.split("/")[1];
                    var bYear = b.split("/")[2];
                    b = new Date(bMonth + "/" + bDay + "/" + bYear).getTime();
                    return a < b ? -1 : a > b ? 1 : 0;
                }
            },
            "date-eu-desc": function (a, b) {
                if (a == "")
                    return 1;
                else if (b == "")
                    return -1;
                else {
                    var aDay = a.split("/")[0];
                    var aMonth = a.split("/")[1];
                    var aYear = a.split("/")[2];
                    a = new Date(aMonth + "/" + aDay + "/" + aYear).getTime();
                    var bDay = b.split("/")[0];
                    var bMonth = b.split("/")[1];
                    var bYear = b.split("/")[2];
                    b = new Date(bMonth + "/" + bDay + "/" + bYear).getTime();
                    return a < b ? 1 : a > b ? -1 : 0;
                }
            },
        });
        this.tableContent = $("#ContentTable").DataTable({
            info: true,
            pagingType: "simple",
            deferRender: true,
            dom: "Brtip",
            order: [[5, "desc"]],
            scrollX: false,
            responsive: {
                details: {
                    type: "column",
                    target: -1,
                },
            },
            buttons: [],
            columnDefs: [
                {
                    orderable: false,
                    targets: 1,
                },
                {
                    className: "control",
                    orderable: false,
                    targets: -1,
                },
                {
                    className: "Titulo tdWrap DatatableTdOverflow dt-body-center dt-head-center",
                    targets: 1,
                },
                {
                    className: "tdWrap DatatableTdOverflow dt-body-center dt-head-center",
                    targets: [2, 3, 4, 5, 6, 7],
                },
                {
                    className: "Avance tdWrap DatatableTdOverflow dt-body-center dt-head-center",
                    targets: 8,
                },
            ],
            //   createdRow: (row, data, dataIndex, cells) => {
            //     this.RenderizarTR(cells, data[0]);
            //   },
            language: {
                decimal: "",
                emptyTable: "Sin datos",
                info: "_START_ - _END_ (_TOTAL_ en total)",
                infoEmpty: "0 - 0 (0 en total)",
                infoFiltered: "(filtrados de _MAX_ registros totales)",
                infoPostFix: "",
                thousands: ",",
                lengthMenu: "Mostrar _MENU_",
                loadingRecords: "Cargando...",
                processing: "Procesando...",
                search: "Búsqueda:",
                zeroRecords: "Sin resultados",
                paginate: {
                    first: "Primero",
                    last: "Último",
                    next: siguiente,
                    previous: anterior,
                },
                aria: {
                    sortAscending: ": activar para ordenar ascendente",
                    sortDescending: ": activar para ordenar descendente",
                },
                bAutoWidth: false,
            },
        });
        setTimeout(function () {
            _this.tableContent.responsive.recalc();
            _this.tableContent.columns.adjust().draw();
        }, 100);
    };
    ListaContent.prototype.render = function () {
        return React.createElement("h2", null, "hola");
    };
    return ListaContent;
}(React.Component));
export default ListaContent;
//# sourceMappingURL=ListaContent.js.map
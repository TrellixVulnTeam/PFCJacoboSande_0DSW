import React from "react";
import { Link } from "react-router-dom";
import { User } from "../common/User";
import { Content } from "../common/Content";
import Consts from "../Consts";
import commonStyles from "../common/common.module.scss";
import * as $ from 'jquery';
import {
  Stack,
  PrimaryButton,
  TextField,
  IIconProps,
  Modal,
  IconButton,
  Label,
  DayOfWeek,
  DatePicker,
  ComboBox,
  IComboBoxOption,
  Spinner,
  SpinnerSize,
  PivotItem,
  Pivot,
  Dropdown,
  IDropdownStyles,
  IDropdownOption,
  IContextualMenuItem,
  getIconClassName,
  initializeIcons,
} from "office-ui-fabric-react";
import "datatables.net";

import "datatables.net-responsive";
import "datatables.net-buttons";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";


interface IListaContentProps {
  // dataFromParent: [];
}

interface IListaContentState {
  isDataLoaded: boolean;
}

export default class ListaContent extends React.Component<
  IListaContentProps,
  IListaContentState
> {
  public dataContent: {
    [key: string]: Content;
  } = {};
  public userActual;
  public tableContent;

  constructor(props: IListaContentProps, state: IListaContentState) {
    super(props);
    this.state = {
      isDataLoaded: false,
    };
    initializeIcons();

  }

  public componentDidMount() {
    // this.props.dataFromParent.map((item: Content) => {
    //   var content = new Content(item);
    //   this.dataContent[content.title] = content;
    // });
    // this.getUser();
    this.initContent();
    this.mountTableContent();
    // $('#ContentTable').DataTable();

  }
public component
  public componentDidUpdate(
    prevProps: Readonly<IListaContentProps>,
    prevState: Readonly<IListaContentState>,
    snapshot?: any
  ): void { }

  public async getUser() {
    let usuario;

    return usuario;
  }
  public async initContent() {
    console.log("init");
    let content;
    try {
      const respuesta = await fetch(`http://localhost:8080/getAllContent.php`, {
        mode: "cors",
      });
      content = await respuesta.json();
    } catch (error) {
      console.log(error);
      // Manage error codes
    }
    content.map((item) => {
      var content = new Content(item);
      this.dataContent[content.title] = content;
      return true;
    });

    console.log(content);

    this.setState({ isDataLoaded: true });
    this.fillTableContent();
  }

  public fillTableContent() {
    console.log("llenar");
    let contentRow = [];
    $.each(this.dataContent, function (idx, listItem) {
      contentRow.push([
        listItem.id,
        `<span title='${listItem.title}'>${listItem.title}<span>`,
        `<span title='${listItem.platform}'>${listItem.platform}<span>`,
        `<span title='${listItem.genre}'>${listItem.genre}<span>`,
        `<span title='${listItem.year}'>${listItem.year}<span>`,
        `<span title='${listItem.rating}'>${listItem.rating}<span>`,
        "",
      ]);
    });
    console.log(contentRow);

    this.tableContent.rows.add(contentRow).draw();
    this.tableContent.draw();
    this.tableContent.responsive.recalc();
    this.tableContent.columns.adjust().draw();
  }
  public geticonoSiguiente() {
    // return "<span class='icoSiguiente'><span/>";
    // return <ArrowForwardIosIcon />;
    return `<i class="${getIconClassName("ChevronRightSmall")}" />`;
    // return `<i class="" />`;


  }
  public geticonoAnterior() {
    // return "<span class='icoAnterior'><span/>";
    return `<i class="${getIconClassName("ChevronLeftSmall")}" />`;
    // return `<i class="" />`;

    // return <ArrowBackIosIcon />;
  }

  public mountTableContent() {
    console.log("montamos");
    var siguiente = this.geticonoSiguiente();
    var anterior = this.geticonoAnterior();
    // Meter iconos de material ui
    // this.renderIcons();
    $.extend($.fn.dataTable.defaults, {
      responsive: true,
    });
    $.extend($.fn.dataTableExt.oSort, {
      "date-eu-asc": function (a, b) {
        if (a === "") return 1;
        else if (b === "") return -1;
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
        if (a === "") return 1;
        else if (b === "") return -1;
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
      order: [[1, "desc"]],
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
          targets: 0,
          createdCell: (td, cellData, rowData, row, col) => {
            // this.RenderButtons(td, col, cellData);
          }
        },
        {
          targets: 5,
          createdCell: (td, cellData, rowData, row, col) => {
            // this.RenderRating(td, col, cellData);
          }
        },
        {
          className: "control",
          orderable: false,
          targets: -1,
        },
        {
          className:
            "Rating tdWrap DatatableTdOverflow dt-body-center dt-head-center",
          targets: 5,
        },
        {
          className: "tdWrap DatatableTdOverflow dt-body-center dt-head-center",
          targets: [2, 3, 4],
        },
        {
          className:
            "Buttons tdWrap DatatableTdOverflow dt-body-center dt-head-center",
          targets: 0,
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
    setTimeout(() => {
      this.tableContent.responsive.recalc();
      this.tableContent.columns.adjust().draw();
    }, 100);
  }

  render(): React.ReactElement<IListaContentProps> {

    return (

      <Pivot
        id="wrapperTablas"
        style={{
          width: "100%",
        }}
      >
        <PivotItem headerText="Lista" alwaysRender={true}>
          <Stack
            className={commonStyles.espacioTabs}
            id="contentStack"
            style={{
              width: "100%",
              marginTop: "5px",
              display: "block",
            }}
          >
             <Stack styles={{ root: { width: "100%" } }} verticalAlign={'center'} tokens={{childrenGap:15}}>
                <Stack styles={{ root: { width: "100%" } }} horizontalAlign={'center'} wrap={true} verticalAlign={"end"} horizontal tokens={{childrenGap:20}}>
                  <Stack grow>
                    <TextField placeholder="Búsqueda" height={10} iconProps={{ iconName: 'Search' }} style={{ width: '100%' }} onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
                      this.tableContent.search(newValue).draw();
                    }} />
                  </Stack>
                </Stack>
            </Stack>
            <div
              id="divTableContent"
              style={{ width: "100%", padding: "0px" }}
              // className={commonStyles.CMScommon}
            >
              <table style={{ width: "100%" }} className="table table-striped" id="ContentTable">
                <thead>
                  <tr>
                    <th>Acciones</th>
                    <th>Titulo</th>
                    <th>Plataforma</th>
                    <th>Géneros</th>
                    <th>Año</th>
                    <th>Valoración</th>
                    <th>Mas...</th>
                  </tr>
                </thead>
                <tbody id="ContentTableBody"></tbody>
              </table>
            </div>
          </Stack>
        </PivotItem>

        <PivotItem headerText="Tarjetas" alwaysRender={true}>
          <Stack
            className={commonStyles.espacioTabs}
            id="contentTabs"
            style={{
              width: "100%",
              marginTop: "5px",
              // display: this.state.isRegistrosDataLoaded ? "block" : "none",
            }}
          >
          </Stack>
        </PivotItem>
      </Pivot>
    );
  }
}


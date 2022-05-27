import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { Helmet } from "react-helmet";

import 'datatables.net';
import 'datatables.net-responsive';
import 'datatables.net-buttons';
import 'datatables.net-select';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import ReactDOM from "react-dom";
import ContentCard from "./ContentCard";
import { GeneratedIdentifierFlags, getLeadingCommentRanges } from "typescript";
import { common } from "@material-ui/core/colors";
import { FiltroColumnas } from "./FiltroColumnas";


interface IListaContentProps {
  data: {
    [key: string]: Content;
  };
  details: (title) => void;
  changeFav: (title, pivot) => void;
  selectedKey: string;


}

interface IListaContentState {
  isDataLoaded: boolean;
}

export default class ListaContent extends React.Component<
  IListaContentProps,
  IListaContentState
> {

  public userActual;
  public tableContent;
  public tableFavs;

  constructor(props: IListaContentProps, state: IListaContentState) {
    super(props);
    this.state = {
      isDataLoaded: false,
    };
    initializeIcons();

  }

  public componentDidMount() {

    this.initContent();

  }
  public component
  public componentDidUpdate(
    prevProps: Readonly<IListaContentProps>,
    prevState: Readonly<IListaContentState>,
    snapshot?: any
  ): void { }


  public async initContent() {

    this.mountTableContent();
    this.mountTableFavs();
    this.fillTableContent();
    this.fillTableFavs();

  }

  public fillTableContent() {
    let contentRow = [];
    $.each(this.props.data, function (idx, listItem) {
      console.log(listItem);
      contentRow.push([
        listItem.title,
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

  public fillTableFavs() {
    let contentRow = [];
    $.each(this.props.data, function (idx, listItem) {
      if (listItem.isFav) {
        contentRow.push([
          listItem.title,
          `<span title='${listItem.title}'>${listItem.title}<span>`,
          `<span title='${listItem.platform}'>${listItem.platform}<span>`,
          `<span title='${listItem.genre}'>${listItem.genre}<span>`,
          `<span title='${listItem.year}'>${listItem.year}<span>`,
          `<span title='${listItem.rating}'>${listItem.rating}<span>`,
          "",
        ]);
      }

    });

    this.tableFavs.rows.add(contentRow).draw();
    this.tableFavs.draw();
    this.tableFavs.responsive.recalc();
    this.tableFavs.columns.adjust().draw();
  }
  public geticonoSiguiente() {
    return `<i class="${getIconClassName("ChevronRightSmall")}" />`;
  }
  public geticonoAnterior() {
    return `<i class="${getIconClassName("ChevronLeftSmall")}" />`;
  }
  public renderButtons(ElementoDOM, col, ID, table) {
    console.log(ID);
    let item: Content = this.props.data[ID];
    console.log("botones" + item);
    console.log(this.props.data);
    var StackAcciones = (
      <Stack grow={false} tokens={{ childrenGap: 8 }} horizontal horizontalAlign={'space-between'}>


        <IconButton iconProps={{ iconName: 'Go' }} title="Abrir en nueva pestaña" ariaLabel="Abrir en nueva pestaña"
          disabled={false}
          checked={false}
          onClick={() => {
            this.props.details(item.title);


          }}
        />

        <IconButton iconProps={{ iconName: item.isFav ? "HeartFill" : "Heart" }} title="Favorito" ariaLabel="Favorito"
          onClick={() => {
            if (item.isFav) {
              this.delFavTable(item);
            } else {
              this.insertFavTable(item);
            }
            if (table === "favs") {
              this.props.changeFav(item.title, 2);
            } else {
              this.props.changeFav(item.title, 0);
            }



          }}
        />

      </Stack>
    )

    ReactDOM.render(StackAcciones, ElementoDOM);
  }

  public delFavTable(item) {
    var indexes = this.tableFavs
      .rows()
      .indexes()
      .filter((value, index) => {
        return item.title === this.tableFavs.row(value).data()[0];
      });
    this.tableFavs.rows(indexes).remove().draw();
    this.tableFavs.draw();

  }
  public insertFavTable(item) {

  }
  public updateTableFavs(title) {
    let item = this.props.data[title];
    if (item.isFav) {
      this.delFavTable(item);
    } else {
      this.insertFavTable(item);
    }
  }

  public mountTableContent() {
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
      // lengthMenu: [[1, 2, 3, -1], [10, 25, 50, "All"]],
      columnDefs: [
        {
          orderable: false,
          targets: [0, 3]
        },
        {
          targets: 0,
          createdCell: (td, cellData, rowData, row, col) => {
            this.renderButtons(td, col, cellData, "list");
            window.setTimeout(()=>{
              this.tableContent.responsive.recalc();
              this.tableContent.columns.adjust().draw();
            },1500)

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


  public mountTableFavs() {
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
    this.tableFavs = $("#FavsTable").DataTable({
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
      // lengthMenu: [[1, 2, 3, -1], [10, 25, 50, "All"]],
      columnDefs: [
        {
          orderable: false,
          targets: [0, 3]
        },
        {
          targets: 0,
          createdCell: (td, cellData, rowData, row, col) => {
            this.renderButtons(td, col, cellData, "favs");
            window.setTimeout(()=>{
              this.tableFavs.responsive.recalc();
              this.tableFavs.columns.adjust().draw();
            },1500)

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
      this.tableFavs.responsive.recalc();
      this.tableFavs.columns.adjust().draw();
    }, 100);
  }


  public createFilterGenre() {
    let genreFilter = [];
    let uniqueGenres;
    let allgenres = [];
    $.each(this.props.data, function (idx, listItem) {
      console.log(listItem);
      let genres = listItem.genre.split(",");
      $.each(genres, function (idx, genre) {
        allgenres.push(genre.trim());
      });
    });
    uniqueGenres = allgenres.filter((c, index) => {
      console.log(c)
      return allgenres.indexOf(c) === index;
    });
    $.each(uniqueGenres, function (idx, genre) {
      genreFilter.push({
        Titulo: genre
      });
    });

    return genreFilter;
  }
  public createFilterPlatform() {
    let platformFilter = [];
    let uniqueplatforms;
    let allplatforms = [];
    $.each(this.props.data, function (idx, listItem) {
      console.log(listItem);
      let platforms = listItem.platform.split(",");
      $.each(platforms, function (idx, platform) {
        allplatforms.push(platform.trim());
      });
    });
    uniqueplatforms = allplatforms.filter((c, index) => {
      console.log(c)
      return allplatforms.indexOf(c) === index;
    });
    $.each(uniqueplatforms, function (idx, platform) {
      platformFilter.push({
        Titulo: platform
      });
    });

    return platformFilter;
  }
  render(): React.ReactElement<IListaContentProps> {



 

    return (
      <>
        {/* <Helmet>
        <style>{'body { background: url(https://images.unsplash.com/photo-1544306094-e2dcf9479da3) no-repeat; }'}</style>
      </Helmet> */}
        <Pivot
          id="wrapperTablas"
          style={{
            width: "100%",
          }}
          defaultSelectedKey={this.props.selectedKey}
        >
          <PivotItem headerText="Lista" alwaysRender={true} itemKey="0">
            <Stack
              className={commonStyles.espacioTabs}
              id="contentStack"
              style={{
                width: "100%",
                marginTop: "5px",
                display: "block",
              }}
            >
              <Stack styles={{ root: { width: "100%", marginBottom: "25px", marginTop: "20px" } }} verticalAlign={'center'} horizontal horizontalAlign={'space-between'} tokens={{ childrenGap: 15 }}>
                <Stack horizontal horizontalAlign="space-between">
                  <FiltroColumnas
                    Titulo="Género"
                    Opciones={this.createFilterGenre()}
                    onchange={
                      (FiltroSeleccionado: string) => {
                        // this.setState({ FiltroEstadoSeleccionado: FiltroSeleccionado });
                        this.tableContent.columns(3).search(FiltroSeleccionado).draw();
                      }
                    }
                  ></FiltroColumnas>
                  <FiltroColumnas
                    Titulo="Plataforma"
                    Opciones={this.createFilterPlatform()}
                    onchange={
                      (FiltroSeleccionado: string) => {
                        // this.setState({ FiltroEstadoSeleccionado: FiltroSeleccionado });
                        this.tableContent.columns(2).search(FiltroSeleccionado).draw();
                      }
                    }
                  ></FiltroColumnas>
                </Stack>
                <Stack styles={{ root: { width: "30%" } }} horizontalAlign={'end'} wrap={true} verticalAlign={"end"} horizontal tokens={{ childrenGap: 20 }}>
                  <Stack grow>
                    <TextField placeholder="Búsqueda" height={10} iconProps={{ iconName: 'Search' }} style={{
                      width: '100%',
                      // backgroundColor:"#202830",color:"#9ab"
                    }} onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
                      this.tableContent.search(newValue).draw();
                    }} />
                  </Stack>

                </Stack>
              </Stack>
              <div
                id="divTableContent"
                style={{ width: "100%", padding: "0px" }}
              >
                <table style={{ width: "100%" }} className="display table table-striped" id="ContentTable">
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
          <PivotItem headerText="Mis favoritos" alwaysRender={true} itemKey="2">
            <Stack
              className={commonStyles.espacioTabs}
              id="contentStack2"
              style={{
                width: "100%",
                marginTop: "5px",
                display: "block",
              }}
            >
               <Stack styles={{ root: { width: "100%", marginBottom: "25px", marginTop: "20px" } }} verticalAlign={'center'} horizontal horizontalAlign={'space-between'} tokens={{ childrenGap: 15 }}>
                <Stack horizontal horizontalAlign="space-between">
                  <FiltroColumnas
                    Titulo="Género"
                    Opciones={this.createFilterGenre()}
                    onchange={
                      (FiltroSeleccionado: string) => {
                        // this.setState({ FiltroEstadoSeleccionado: FiltroSeleccionado });
                        this.tableFavs.columns(3).search(FiltroSeleccionado).draw();
                      }
                    }
                  ></FiltroColumnas>
                  <FiltroColumnas
                    Titulo="Plataforma"
                    Opciones={this.createFilterPlatform()}
                    onchange={
                      (FiltroSeleccionado: string) => {
                        // this.setState({ FiltroEstadoSeleccionado: FiltroSeleccionado });
                        this.tableFavs.columns(2).search(FiltroSeleccionado).draw();
                      }
                    }
                  ></FiltroColumnas>
                </Stack>
                <Stack styles={{ root: { width: "30%" } }} horizontalAlign={'end'} wrap={true} verticalAlign={"end"} horizontal tokens={{ childrenGap: 20 }}>
                  <Stack grow>
                    <TextField placeholder="Búsqueda" height={10} iconProps={{ iconName: 'Search' }} style={{
                      width: '100%',
                      // backgroundColor:"#202830",color:"#9ab"
                    }} onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
                      this.tableFavs.search(newValue).draw();
                    }} />
                  </Stack>

                </Stack>
              </Stack>
              <div
                id="divTableFavs"
                style={{ width: "100%", padding: "0px" }}
              >
                <table style={{ width: "100%" }} className="display table table-striped" id="FavsTable">
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
                  <tbody id="FavsTableBody"></tbody>
                </table>
              </div>
            </Stack>
          </PivotItem>
          <PivotItem headerText="Tarjetas" alwaysRender={true} itemKey="1">
            <Stack
              className={commonStyles.espacioTabs}
              id="contentTabs"
              style={{
                width: "100%",
                marginTop: "5px",
                // display: this.state.isRegistrosDataLoaded ? "block" : "none",
              }}
            >
              <div className={commonStyles.divTarjetas}
              >
                {
                  // Object.keys(this.props.dataContent).map((key:string)=>{
                  //   let listitem = this.props.dataContent[key];
                  //   console.log("hola"+listitem);
                  // // return  <ContentCard key={key} item={listitem}></ContentCard>
                  // return <h2>hola</h2>
                  Object.entries(this.props.data).map(([key, value]) => (
                    <ContentCard
                      changeFav={(title, pivot) => {
                        this.props.changeFav(title, pivot);
                        this.updateTableFavs(title);
                      }}
                      key={key} item={value}
                      details={(title) => {
                        this.props.details(title);
                      }}

                    />
                  ))}

              </div>

            </Stack>
          </PivotItem>
        </Pivot></>
    );
  }
}


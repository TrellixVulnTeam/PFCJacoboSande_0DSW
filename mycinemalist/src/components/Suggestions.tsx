import React, { useEffect, useRef, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { User } from "../common/User";
import { Content } from "../common/Content";
import ContentCard from "./ContentCard";
import { getLeadingCommentRanges } from "typescript";
import { common } from "@material-ui/core/colors";
import NewComment from "./NewComment";
import { Button, CircularProgress } from "@material-ui/core";
import {
  Callout,
  DefaultButton,
  getIconClassName,
  IconButton,
  mergeStyleSets,
  Stack,
  TextField,
} from "office-ui-fabric-react";
import * as $ from "jquery";
import { Suggestion } from "../common/Suggestion";
import ReactDOM from "react-dom";

import commonStyles from "../common/common.module.scss";
import "datatables.net";
import "datatables.net-responsive";
import "datatables.net-buttons";
import "datatables.net-select";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";
import FormSugg from "./FormSugg";

function Suggestions(props) {
  const [loading, setLoading] = useState(true);
  const [isOpenCallout, setIsOpenCallout] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [targetTitle, setTargetTitle] = useState("");

  const [data, setData] = useState({});

  const tableSugg = useRef<any>();
  // const table =null;
  const dataSuggestions: {
    [key: string]: Suggestion;
  } = {};

  useEffect(() => {
    // Cargamos la página e iniciamos las sugerencias
    setLoading(true);
    setTimeout(() => {
      initSugg();
    }, 100);
  }, []);

  useEffect(() => {
    // Reiniciamos el state loading para recargar el componente
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [loading]);

  useEffect(() => {
    // Al rellenar data llenamos la tabla de sugerencias si hay alguna
    if (Object.keys(data).length > 0 && !dataLoaded) {
      fillTableSugg();
      setDataLoaded(true);
    }
  }, [data]);

  const initSugg = async () => {
    // Iniciamos las sugerencias montando la tabla y trayendonos todas las sugerencias
    mountTableSugg();
    let suggestions;
    try {
      const suggest = await fetch(`http://localhost:8080/getAllSugg.php`, {
        mode: "cors",
      });
      suggestions = await suggest.json();
    } catch (error) {}
    var data = {};
    suggestions.map((item) => {
      var suggestion = new Suggestion(item);
      dataSuggestions[suggestion.title] = suggestion;
      return true;
    });
    setData(dataSuggestions);
  };

  const fillTableSugg = () => {
    // LLenamos la tabla de sugerencias con los campos que queremos mostrar, titulo, plataforma y año
    let suggRow = [];
    $.each(data, function (idx, listItem) {
      let id = listItem.title.split(/\s/).join("");
      suggRow.push([
        listItem.title,
        `<span  id='${id}' title='${listItem.title}'>${listItem.title}<span>`,
        `<span title='${listItem.platform}'>${listItem.platform}<span>`,
        `<span title='${listItem.year}'>${listItem.year}<span>`,
        "",
      ]);
    });
    tableSugg.current.rows.add(suggRow).draw();
    tableSugg.current.draw();
    tableSugg.current.responsive.recalc();
    tableSugg.current.columns.adjust().draw();
  };

  const geticonoSiguiente = () => {
    return `<i class="${getIconClassName("ChevronRightSmall")}" />`;
  };
  const geticonoAnterior = () => {
    return `<i class="${getIconClassName("ChevronLeftSmall")}" />`;
  };
  const mountTableSugg = () => {
    var siguiente = geticonoSiguiente();
    var anterior = geticonoAnterior();
    // Montamos la tabla de sugerencias
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

    tableSugg.current = $("#SuggTable").DataTable({
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
          className: "control",
          orderable: false,
          targets: -1,
        },
        {
          targets: [1, 2, 3],
          width: "300px",
        },
        {
          className: "Botones",
          width: "1%",
          targets: 0,
        },
        {
          targets: 0,
          visible: false,
        },
      ],
      createdRow: (row, data, dataIndex, cells) => {
        // RenderizarTR(cells, data[0]);
      },
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
    $("#SuggTable").on("click", "tr", async function () {
      // Metodo onclick de cada fila para abrir las opciones al administrador de la pagina
      let id = $(this).children(0)[0].childNodes[0].attributes.title.value;
      let title = id.split(/\s/).join("");

      setTargetTitle(id);
      setIsOpenCallout(true);
    });
    setTimeout(() => {
      tableSugg.current.responsive.recalc();
      tableSugg.current.columns.adjust().draw();
    }, 100);
  };

  const newSuggestion = async (admin, title) => {
    // Creacion de nuna nueva sugerencia o contenido
    let suggestion = data[title];
    var Formulario;

    async function SubmitForm(suggest: any) {
      if (title) {
        // Si ya existe una sugerencia, la borramos y creamos contenido
        const util = JSON.stringify(suggest);

        const respuesta = await fetch(`http://localhost:8080/newContent.php`, {
          mode: "cors",
          method: "POST",
          body: util,
        });

        const succes = await respuesta.json();
        // Borramos la sugerencia
        deleteSuggestion(suggest.title);
        if (succes) {
        }
      } else {
        // Creamos nueva sugerenciia
        const util = JSON.stringify(suggest);
        const respuesta = await fetch(
          `http://localhost:8080/newSuggestion.php`,
          {
            mode: "cors",
            method: "POST",
            body: util,
          }
        );
        //   push a bbdd
        const succes = await respuesta.json();
        if (succes) {
        }
        setTimeout(() => {
          updateTable(suggest.title);
        }, 1100);

        // añadir la sugerencia a tabla e item
      }

      return true;
    }

    Formulario = (
      <FormSugg
        submit={SubmitForm.bind(this)}
        sugg={suggestion}
        context={props.context}
        admin={admin}
      ></FormSugg>
    );

    let container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.render(Formulario, container);
  };

  const updateTable = async (title) => {
    // Actualizamos la tabla de gugerencias despues de añadir una nueva
    let sugg;
    const suggestion = await fetch(
      `http://localhost:8080/getSuggestion.php?title=${title}`,
      {
        mode: "cors",
      }
    );
    sugg = await suggestion.json();
    let newRow = createNewSugg(sugg);
    tableSugg.current.rows.add(newRow);
    tableSugg.current.draw();
    tableSugg.current.responsive.recalc();
    tableSugg.current.columns.adjust().draw();
  };

  const createNewSugg = (sugg) => {
    // Construimos el html de la nueva sugerencia para añadir a la tabla
    let newSugg = new Suggestion(sugg);
    data[newSugg.title] = newSugg;

    return [
      [
        newSugg.title,
        `<span title='${newSugg.title}'>${newSugg.title}<span>`,
        `<span title='${newSugg.platform}'>${newSugg.platform}<span>`,
        `<span title='${newSugg.year}'>${newSugg.year}<span>`,
        "",
      ],
    ];
  };
  const deleteSuggestion = async (title) => {
    // Metodo para borrar sugerencias
    let sugg = data[title];

    const respuesta = await fetch(
      `http://localhost:8080/delSuggestion.php?id=${sugg.id}`,
      {
        method: "DELETE",
      }
    );
    const succes = await respuesta.json();
    var indexes = tableSugg.current
      .rows()
      .indexes()
      .filter((value, index) => {
        return sugg.title === tableSugg.current.row(value).data()[0];
      });
    tableSugg.current.rows(indexes).remove().draw();
    tableSugg.current.draw();
  };
  const styles = mergeStyleSets({
    callout: {
      width: 220,
      padding: "15px 15px",
    },
  });

  return (
    <>
      <Stack
        style={{
          width: "100%",
          display: loading ? "block" : "none",

          margin: "100px 45% 0% 45%",
        }}
        horizontal
        horizontalAlign="center"
      >
        <CircularProgress color="inherit" size="100px" />
      </Stack>
      <Stack
        className={commonStyles.espacioTabs}
        id="SuggStack"
        style={{
          width: "100%",
          marginTop: "5px",
          display: loading ? "none" : "block",
        }}
      >
        <Stack
          styles={{ root: { width: "100%", marginBottom: "25px" } }}
          verticalAlign={"center"}
          horizontalAlign={"end"}
          tokens={{ childrenGap: 15 }}
        >
          <DefaultButton
            text="Nueva sugerencia"
            onClick={() => {
              newSuggestion(false, null);
            }}
            allowDisabledFocus
          />

          <Stack
            styles={{ root: { width: "30%" } }}
            horizontalAlign={"end"}
            wrap={true}
            verticalAlign={"end"}
            horizontal
            tokens={{ childrenGap: 20 }}
          >
            <Stack grow>
              <TextField
                placeholder="Búsqueda"
                height={10}
                iconProps={{ iconName: "Search" }}
                style={{ width: "100%" }}
                onChange={(
                  event: React.FormEvent<
                    HTMLInputElement | HTMLTextAreaElement
                  >,
                  newValue?: string
                ) => {
                  tableSugg.current.search(newValue).draw();
                }}
              />
            </Stack>
          </Stack>
        </Stack>
        <div id="divTableSugg" style={{ width: "100%", padding: "0px" }}>
          <table
            style={{ width: "100%" }}
            className="display table table-striped"
            id="SuggTable"
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Titulo</th>
                <th>Plataforma</th>
                <th>Año</th>
                <th>Mas...</th>
              </tr>
            </thead>
            <tbody id="SuggTableBody"></tbody>
          </table>
        </div>
      </Stack>

      {isOpenCallout && props.user.isAdmin && (
        <Callout
          className={styles.callout}
          role="dialog"
          gapSpace={0}
          target={`#${targetTitle.split(/\s/).join("")}`}
          onDismiss={() => {
            setIsOpenCallout(false);
          }}
          setInitialFocus
        >
          <Stack
            horizontal
            style={{ width: "100%" }}
            horizontalAlign="space-around"
          >
            <Button
              style={{
                border: "1px solid black",
                backgroundColor: "black",
                color: "white",
                fontSize: "10px",
              }}
              onClick={() => {
                newSuggestion(true, targetTitle);
                setIsOpenCallout(false);
              }}
            >
              Completar
            </Button>
            <Button
              onClick={() => {
                setIsOpenCallout(false);
                deleteSuggestion(targetTitle);
              }}
              style={{ border: "1px solid black", fontSize: "10px" }}
            >
              Borrar
            </Button>
          </Stack>
        </Callout>
      )}
    </>
  );
}

export default Suggestions;
